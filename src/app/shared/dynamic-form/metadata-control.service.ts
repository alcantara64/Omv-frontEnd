import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseMetadata } from 'src/app/core/models/metadata/metadata-base';

@Injectable()
export class MetadataControlService {
  constructor() { }

  toFormGroup(metadata: BaseMetadata<any>[] ) {
    let group: any = {};

    metadata.forEach(async question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    
    return new FormGroup(group);
  }
}
