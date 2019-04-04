import { BaseMetadata } from 'src/app/core/models/metadata/metadata-base';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-metadata',
  templateUrl: './dynamic-form-metadata.component.html',
  styleUrls: ['./dynamic-form-metadata.component.css']
})
export class DynamicFormMetadataComponent {

  @Input() metadata: BaseMetadata<any>;
  @Input() form: FormGroup;
  get isValid() { 
    if (this.form.controls){
      // return this.form.controls[this.metadata.key].valid; 
      return true;
    }
  }
}
