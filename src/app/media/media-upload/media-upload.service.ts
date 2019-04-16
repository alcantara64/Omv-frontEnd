import { Injectable } from "@angular/core";
import { Validators, ValidatorFn } from "@angular/forms";
import { FieldConfiguration } from "src/app/shared/dynamic-components/field-setting";
import { DirectoryDataService } from 'src/app/core/services/data/directory/directory.data.service';
import { MetadataFieldType } from 'src/app/core/enum/metadataFieldType';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { BlobService, UploadParams } from 'angular-azure-blob-service'
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

  constructor(private directoryDataService: DirectoryDataService, private store: Store, private blob: BlobService) { }


  upload(directoryId: number, file: File, metadata: string, folderPath: string) {
    const Config: UploadParams = {
      sas: '?st=2019-04-15T15%3A20%3A08Z&se=2019-05-30T15%3A20%3A00Z&sp=rwl&sv=2018-03-28&sr=c&sig=QMg%2F6Ed91i8Rl6%2BRRxvFwm%2BC6gpTF1oXyjARMgo6hlw%3D',
      storageAccount: 'omvclient8946',
      containerName: 'media'
    };
    
    let splitByLastDot = function (text) {
      var index = text.lastIndexOf('.');
      return [text.slice(0, index), text.slice(index + 1)]
    }

    if (file !== null) {
      const baseUrl = this.blob.generateBlobUrl(Config, file.name);
      this.config = {
        baseUrl: baseUrl,
        sasToken: Config.sas,
        blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
        file: file,
        complete: () => {

          let thumbnail = `https://${Config.storageAccount}.blob.core.windows.net/thumbs/${file.name}`;
          let _folderPath = folderPath.replace('>', '/');
          
          console.log('MediaUploadService compelete folder-path: ', _folderPath);
          
          let item = new MediaItem();
          item.metadata = metadata;
          item.size = file.size;
          item.name = file.name;
          item.contentType = file.type;
          item.directoryId = directoryId;
          item.url = this.config.baseUrl;
          item.documentTypeCode = splitByLastDot(file.name).pop().toUpperCase();
          item.requester = 1;
          item.thumbnail = thumbnail;
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
  }

  async getDirectoryMetadata(directoryId: number) {
    let metaArray: FieldConfiguration[] = [];
    let items = await this.directoryDataService.getMetadata(directoryId).toPromise();
    if (items) {
      items.forEach(async item => {
        let field: FieldConfiguration;
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

    return await metaArray.sort(x => x.order);
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


  private buildDropdown(item: Metadata): FieldConfiguration {
    return {
      type: "select",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order,
      optionsId: item.listId,
      options: item.options,
      value: '',
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
