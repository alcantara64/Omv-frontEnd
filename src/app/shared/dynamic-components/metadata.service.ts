import { Injectable } from '@angular/core';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { map, mergeMap } from 'rxjs/operators';
import { FieldConfig } from './field.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class MetadataService {

  constructor(private mediaDataService: MediaDataService) { }

  async getMetadata(): Promise<FieldConfig[]> {
    let metaArray = [];
    let data = this.mediaDataService.getMetadata(1).pipe(
      map(response => {
        response.forEach(async item => {
          await this.buildMetaData(item).pipe(map(res => {
            console.log('testing res: ', res);
            metaArray.push(res);            
          }));
        });
      return metaArray;
    })).toPromise();
    
    console.log('testing select: ', data);

    return data;
  }

  buildMetaData(item: any): Observable<any> {
    if (item.type === 'text') {
      return of({
        type: "input",
        label: item.label,
        inputType: "text",
        name: item.name
      });
    } else if (item.type === 'select') {
      let da = this.mediaDataService.getMetadataOptions(item.optionsId).pipe(map(response => {
        let options: any = [];
        response.forEach(res => {
          let s = { "value": res.key, "text": res.value };
          options.push(s);
        });
        let select = {
          type: "select",
          label: item.label,
          name: item.name,
          value: null,
          options: options
        };
        console.log('testing select: ', select);
  
        return select;
      }));
      return da;
    }          
  }
}
