import { Injectable } from '@angular/core';
import { AdminMediaDataService } from 'src/app/core/services/data/admin-media/admin-media.data.service';
import { Observable, of } from 'rxjs';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';

@Injectable({
  providedIn: 'root'
})
export class AdminMediaUploadsDetailsService {

  constructor(private adminMediaDataService: AdminMediaDataService) {}


  async getUploadRequestFields(id: number) {
    let metaArray: FieldConfiguration[] = [];
    let details = await this.adminMediaDataService.getUploadRequest(id).toPromise();
    if (details) {
      // Step 1: Get details keys
      let detailsFields = Object.keys(details);
      detailsFields.forEach(name => {
        if (name !== 'metadata') {
          let label: FieldConfiguration = {
            type: 'label',
            cssClass: 'col-md-6',
            name: name,
            label: name.charAt(0).toUpperCase() + name.slice(1),
            value: details[name]
          }
          metaArray.push(label);
        }
      });

      // Step 2: Get metadata keys
      let itemMetadata = JSON.parse(details.metadata);
      let metadataFields = Object.keys(itemMetadata);

      metadataFields.forEach(name => {
        let label: FieldConfiguration = {
          type: 'label',
          cssClass: 'col-md-6',
          name: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          value: itemMetadata[name]
        }
        metaArray.push(label);
      });
    }
    return await metaArray;
  }

  private buildLabel(item: Metadata): FieldConfiguration {
    return {
      type: "label",
      label: item.fieldName,
      name: item.fieldName,
      order: item.order
    };
  }
}