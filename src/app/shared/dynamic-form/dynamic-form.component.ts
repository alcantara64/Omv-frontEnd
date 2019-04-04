import { BaseMetadata } from 'src/app/core/models/metadata/metadata-base';
import { Component, OnInit, Input } from '@angular/core';
import { MetadataControlService } from './metadata-control.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ MetadataControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() metadata: BaseMetadata<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private data: MetadataControlService, private fb: FormBuilder) {  }

  ngOnInit() {
    this.form = this.data.toFormGroup(this.metadata);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
