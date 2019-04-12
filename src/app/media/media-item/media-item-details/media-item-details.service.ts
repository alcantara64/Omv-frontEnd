import { Injectable } from "@angular/core";
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { Validators, ValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MediaItem } from 'src/app/core/models/entity/media';
import { DirectoryDataService } from 'src/app/core/services/data/directory/directory.data.service';
import { MetadataFieldType } from 'src/app/core/enum/metadataFieldType';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { MetadataFieldsDataService } from 'src/app/core/services/data/metadata-fields/metadata-fields.data.service';

@Injectable({
  providedIn: 'root'
})
export class MediaItemDetailsService {

  constructor(private directoryDataService: DirectoryDataService, private metadataFieldsDataService: MetadataFieldsDataService) {}

  async getMetadaFields(mediaItem: MediaItem) {
    let itemMetadata = JSON.parse(mediaItem.metadata);
    let itemFieldNames = Object.keys(itemMetadata);
    return await this.getMetadata(mediaItem).then(data => {
      
      console.log('MediaItemDetailsService - getMetadaFields data: ', data);
      data.forEach(async item => {
        // Set the value of each metadata field based on the media item details
        if (itemFieldNames.map(x => x.toLowerCase()).includes(item.name.toLowerCase())) {
          item.value = itemMetadata[item.name];
          console.log('MediaItemDetailsService - getMetadaFields item.value ', item.value);
        }
      });
      return data;
    });
  }

  async getMetadata(mediaItem: MediaItem) {
    let metaArray: FieldConfiguration[] = [];
    let items = await this.directoryDataService.getMetadata(mediaItem.directoryId).toPromise();
    if (items) {
      items.forEach(async item => {
        let field: FieldConfiguration;
        switch(item.fieldTypeName) {
          case MetadataFieldType.Text:
            field = this.buildTextBox(item);
            break;
          case MetadataFieldType.Select:
            field = this.buildDropdown(item);
            break;
          case MetadataFieldType.Date:
            field = this.buildDate(item);
            break;
        }
        metaArray.push(field);
      });
    
      // Get fields that exist in media item but are not in its corresponding metadata
      let itemMetadata = JSON.parse(mediaItem.metadata);
      let itemFieldNames = Object.keys(itemMetadata);
      const otherFields = itemFieldNames.filter(_item => 
                                    items.map(x => x.fieldName)
                                          .indexOf(_item) === -1);
      otherFields.forEach(name => {
        let labelControl = new FieldConfiguration();
        labelControl.type = 'label';
        labelControl.name = name;
        labelControl.label = name.charAt(0).toUpperCase() + name.slice(1);
        labelControl.value = mediaItem[name];
        metaArray.push(labelControl);
      });      
    }

    return await metaArray.sort(x => x.order);
  }

  private getOptions(id: number) {
    return this.metadataFieldsDataService.getListItems(id).pipe(
      map(items => {
        if (items) {
          return items.sort(x => x.itemSort);
        } 
        return [];
      })
    );
  }

  private buildTextBox(item: Metadata): FieldConfiguration {
    return {
      type: "input",
      label: item.fieldName,
      inputType: "text",
      name: item.fieldName,
      order: item.order,
      placeholder: item.fieldName,
      validations: this.getValidations(item)
    };
  }

  private buildLabel(item: Metadata): FieldConfiguration {
    return {
      type: "label",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order
    };
  }

  private buildDropdown(item: Metadata): FieldConfiguration {
    return {
      type: "select",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order,
      optionsId: item.listId,
      options: item.options,
      placeholder: 'Please select',
      validations: this.getValidations(item)
    };
  }

  private buildDate(item: Metadata): FieldConfiguration {
    return {
      type: "date",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order,
      validations: this.getValidations(item)
    };
  }

  private getValidations(item: Metadata): ValidatorFn[] {
    let validations: ValidatorFn[] = [];
    if (item.isRequired) {
      let requiredValidation: any = {
        name: 'required',
        validator: Validators.required,
        message: `${item.fieldName} is required`
      };
      validations.push(requiredValidation);
    }
    return validations;
  }
}