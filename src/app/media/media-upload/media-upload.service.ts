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
      sas: '?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwlacup&st=2019-04-13T17%3A39%3A41Z&se=2019-04-14T17%3A39%3A41Z&sig=8O%2FoUN1Um%2BEKNeEm%2BIPKYM6m165YVqun31ZuGI6niNI%3D',
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
      cssClass: 'col-md-6',
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
      cssClass: 'col-md-6',
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
      cssClass: 'col-md-6',
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
