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


  getUploadRequestFields(id: number): Observable<any> {

    return of(null);
  }

  async getMetadata(id: any) {
    let metaArray: FieldConfiguration[] = [];
    let details = await this.adminMediaDataService.getUploadRequest(id).toPromise();
    if (details) {
      // Step 1: Get details keys
      let itemMetadata = JSON.parse(details.metadata);
      let itemFieldNames = Object.keys(itemMetadata);

      

      // otherFields.forEach(name => {
      //   let labelControl = new FieldConfiguration();
      //   labelControl.type = 'label';
      //   labelControl.name = name;
      //   labelControl.label = name.charAt(0).toUpperCase() + name.slice(1);
      //   labelControl.value = mediaItem[name];
      //   metaArray.push(labelControl);
      // });
    }

    return await metaArray.sort(x => x.order);
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