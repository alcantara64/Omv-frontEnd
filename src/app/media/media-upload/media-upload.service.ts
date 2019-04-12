import { Injectable } from "@angular/core";
import { Validators, ValidatorFn } from "@angular/forms";
import { FieldConfiguration, FieldValidator } from "src/app/shared/dynamic-components/field-setting";
import { map } from "rxjs/operators";
import { DirectoryDataService } from 'src/app/core/services/data/directory/directory.data.service';
import { MetadataFieldsDataService } from 'src/app/core/services/data/metadata-fields/metadata-fields.data.service';
import { MetadataFieldType } from 'src/app/core/enum/metadataFieldType';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { MediaItem } from 'src/app/core/models/entity/media';
import { Store } from '@ngxs/store';
import { CreateMediaItem } from '../state/media/media.action';
import { HideSpinner, DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';

@Injectable({
  providedIn: "root"
})
export class MediaUploadService {

  config: any;
  percent: any;

  constructor(private directoryDataService: DirectoryDataService, private metadataFieldsDataService: MetadataFieldsDataService,
    private store: Store, private blob: BlobService) { }


  upload(directoryId: number, file: File, metadata: string): Observable<any> {
    const Config: UploadParams = {
      sas: '?st=2019-04-12T14%3A31%3A52Z&se=2019-04-13T14%3A31%3A52Z&sp=rwl&sv=2018-03-28&sr=c&sig=HyVLzOAgBMuvHq49DZxTFv0%2FFdNuIpthmkGMkeSnc0A%3D',
      storageAccount: 'ocean33r1ngm3d1avault',
      containerName: 'media/Platform/rigs/ursa/2019/Documents'
    };
    
    let splitByLastDot = function (text) {
      var index = text.lastIndexOf('.');
      return [text.slice(0, index), text.slice(index + 1)]
    }

    let retVal = false;

    if (file !== null) {
      const baseUrl = this.blob.generateBlobUrl(Config, file.name);
      this.config = {
        baseUrl: baseUrl,
        sasToken: Config.sas,
        blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
        file: file,
        complete: () => {
          
          let item = new MediaItem();
          item.metadata = metadata;
          item.size = file.size;
          item.name = file.name;
          item.contentType = file.type;
          item.directoryId = directoryId;
          item.url = this.config.baseUrl;
          item.documentTypeCode = splitByLastDot(file.name).pop().toUpperCase();
          item.requester = 1;
          this.store.dispatch(new CreateMediaItem(item));
        },
        error: (err) => {
          console.log('MediaUploadService upload Error: ', err);
          this.store.dispatch(new HideSpinner());
          this.store.dispatch(new DisplayToastMessage(err.statusText, ToastType.error));
        },
        progress: (percent) => {
          console.log('MediaUploadService upload progress: ', percent);
          this.percent = percent;
        }
      };
      this.blob.upload(this.config);
    }
    return of(retVal);
  }

  async getDirectoryMetadata(directoryId: number) {
    let metaArray = [];
    let items = await this.directoryDataService.getMetadata(directoryId).toPromise();
    if (items) {
      items.forEach(async item => {
        let field: any;
        switch (item.fieldTypeName) {
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
    }

    metaArray.forEach(async item => {
      if (item.type === 'select') {
        item.options = await this.getOptions(item.optionsId).toPromise();
      }
    });

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
      options: [],
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
