import { TextboxMetadata } from './../../core/models/metadata/metadata-textbox';
import { DropdownMetadata } from './../../core/models/metadata/metadata-dropdown';
import { BaseMetadata } from 'src/app/core/models/metadata/metadata-base';
import { Injectable }       from '@angular/core';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class MetadataService {

  constructor(private mediaDataService: MediaDataService) { }

  getMetadata() {

    let metadata: BaseMetadata<any>[] = [
      new DropdownMetadata({
        key: 'brave',
        label: 'Country',
        options: [
          {key: 'mx',  value: 'Mexico'},
          {key: 'cn',  value: 'Canada'}
        ],
        order: 3
      }),
 
      new TextboxMetadata({
        key: 'company',
        label: 'Company',
        value: '',
        required: true,
        order: 1
      }),
 
      new TextboxMetadata({
        key: 'location',
        label: 'Location',
        type: 'text',
        order: 2
      })
    ];

    // let data = this.mediaDataService.getMetadata(1).pipe(
    //   map(results => {
    //     results.forEach(async item => {
    //       let response = this.buildMetaData(item);
    //       metadata.push(response);
    //     });
    //     console.log('MetadataService - metadata: ', metadata);
    //     return metadata.sort((a, b) => a.order - b.order);
    //   })
    // )

    return metadata.sort((a, b) => a.order - b.order);
  }

  buildMetaData(item: any) {
    if (item.type === 'text') {
      let textBox = new TextboxMetadata({
        key: item.fieldName,
        label: item.fieldName,
        value: item.value,
        required: item.isRequired,
        order: item.order
      });
      return textBox;
    } else if (item.type === 'select') {
      //let options: any;
      // await this.mediaDataService.getMetadataOptions(item.optionsId).subscribe(result => options = result);
      let dropDown = new DropdownMetadata({
        key: item.fieldName,
        label: item.fieldName,
        order: item.order,
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
      });
      return dropDown;
    }          
  }
}
