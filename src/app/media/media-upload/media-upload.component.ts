import { GetDirectoryMetadata } from './../state/media/media.action';
import { Component, OnInit, ViewChild } from '@angular/core';
import { projectData } from './data';
import { SelectionSettingsModel } from '@syncfusion/ej2-treegrid';
import { RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { MetadataService } from 'src/app/shared/dynamic-components/metadata.service';
import { Store, Select } from '@ngxs/store';
import { GetMetadata } from '../state/media/media.action';
import { MediaState } from '../state/media/media.state';
import { FieldConfig } from 'src/app/shared/dynamic-components/field-config.interface';

const BROWSE = 'Browse';
const CHANGE = 'Change';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent implements OnInit {

  fileName: string;
  uploadButtonText = BROWSE;
  dataSource: any;
  isFileSelected: boolean;
  isDestinationSelected: boolean;

  data: Object[];

  @ViewChild('file') file;
  selectionOptions: SelectionSettingsModel;

  
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  metadata: FieldConfig[] = [];

  @Select(MediaState.getDirectoryMetadata) directoryMetadata$: Observable<any[]>;
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.data = projectData;
    this.selectionOptions = { mode: 'Row', type: 'Single' };

    this.store.dispatch(new GetDirectoryMetadata(4));

    this.directoryMetadata$.subscribe(data => {
      this.metadata = data;
      console.log('MediaUploadComponent ngOnInit fields: ', this.metadata);   
    });
  }  

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.fileName = files[0].name;
    if (this.fileName) {
      this.uploadButtonText = CHANGE;
      this.isFileSelected = true;
    }
  }

  changeDestination() {
    this.isDestinationSelected = false;
  }

  rowSelected(args: any) {
    console.log('MediaUploadComponent - rowBound: ', args);
    let data = args.data;
    if (data) {
      this.isDestinationSelected = true;
    }
  }

  submit(value: any) {
    console.log('submit: ', value);
    console.log('submit form: ', this.dynamicForm.value);
  }
}
