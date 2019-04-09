import { Injectable } from "@angular/core";
import { FieldConfig, Validator } from 'src/app/shared/dynamic-components/field-config.interface';
import { Validators } from '@angular/forms';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaItemDetailsService {

  constructor(private mediaDataService: MediaDataService) {}

  async getMetadaFields(id: number) { 
    let mediaItem = await this.mediaDataService.getMediaItem(id).toPromise();
    let itemFields = Object.keys(mediaItem);
    let data = await this.getMetadata(mediaItem);
    data.forEach(async item => {
      // Set the value of each metadata field based on the media item details
      if (itemFields.includes(item.name)) {
        item.value = mediaItem[item.name];
      }
      // Get options if field is a dropdown select
      if (item.type === 'select') {
        item.options = await this.getOptions(item.optionsId).toPromise();      
      }
    });
    return data;
  }

  async getMetadata(mediaItem: any) {
    let metaArray = [];
    let items = await this.mediaDataService.getMetadata(1).toPromise();
    if (items) {
      items.forEach(async item => {
        let field: any;
        switch(item.type) {
          case 'text':
            field = this.buildTextBox(item);
            break;
          case 'select':
            field = this.buildDropdown(item);
            break;
          case 'date':
            field = this.buildDate(item);
            break;
          case 'label':
            field = this.buildLabel(item);
            break;
        }
        metaArray.push(field);
      });
    
      // Get fields that exist in media item but are not in its corresponding metadata
      let itemFields = Object.keys(mediaItem);
      const otherFields = itemFields.filter(_item => items.map(x => x.name).indexOf(_item) === -1);
      otherFields.forEach(name => {
        let labelControl = new FieldConfig();
        labelControl.type = 'label';
        labelControl.name = name;
        labelControl.label = name.charAt(0).toUpperCase() + name.slice(1);
        labelControl.value = mediaItem[name];
        metaArray.push(labelControl);
      });      
    }

    return await metaArray.sort(x => x.order);
  }

  private getOptions(id: any) {
    return this.mediaDataService.getMetadataOptions(id).pipe(
      map(items => {
        let options = [];
        items.forEach(res => {
          let option = { "value": res.key, "text": res.value };
          options.push(option);
        });
        return options;
      })
    );
  }

  private buildTextBox(item: any): FieldConfig {
    return {
      type: "input",
      label: item.label,
      inputType: "text",
      name: item.name,
      order: item.order,
      placeholder: item.label,
      validations: this.getValidations(item)
    };
  }

  private buildLabel(item: any): FieldConfig {
    return {
      type: "label",
      label: item.label,
      name: item.name,
      order: item.order
    };
  }

  private buildDropdown(item: any): any {
    return {
      type: "select",
      label: item.label,
      name: item.name,
      order: item.order,
      optionsId: item.optionsId,
      options: item.options,
      placeholder: 'Select an option',
      validations: this.getValidations(item)
    };
  }

  private buildDate(item: any) {
    return {
      type: "date",
      label: item.label,
      name: item.name,
      order: item.order,
      validations: this.getValidations(item)
    };
  }

  private getValidations(item: any): any[] {
    let validations = [];
    if (item.isRequired) {
      let requiredValidation: Validator = {
        name: 'required',
        validator: Validators.required,
        message: `${item.label} is required`
      };
      validations.push(requiredValidation);
    }
    return validations;
  }
}