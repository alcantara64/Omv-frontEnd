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
import { CustomersDataService } from 'src/app/core/services/data/customers/customers.data.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: "root"
})
export class MediaUploadService {

  config: any;
  percent: any;
  sasToken: any;
  storageAccount: any;
  containerName: any;

  constructor(private directoryDataService: DirectoryDataService, private customersDataService: CustomersDataService, private store: Store, private blob: BlobService) { }


  upload(directoryId: number, file: File, metadata: string, folderPath: string) {
    this.customersDataService.getSetting(1, 'SASToken').pipe(
      tap(response => {
        this.sasToken = response.value;
        this.customersDataService.getSetting(1, 'storageAccount').pipe(
          tap(account => {
            this.storageAccount = account.value;

            const Config: UploadParams = {
              sas: this.sasToken,
              storageAccount: this.storageAccount,
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
          })
        )
      })
    );
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
