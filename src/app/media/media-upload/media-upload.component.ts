import { GetDirectoryMetadata, GetDirectories, GetMediaTreeData } from './../state/media/media.action';
import { Component, OnInit, ViewChild } from '@angular/core';
import { projectData } from './data';
import { SelectionSettingsModel } from '@syncfusion/ej2-treegrid';
import { RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { Store, Select } from '@ngxs/store';
import { MediaState } from '../state/media/media.state';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { Directory } from 'src/app/core/models/entity/directory';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';

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


  @ViewChild('file') file;
  selectionOptions: SelectionSettingsModel;

  
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  metadata: FieldConfiguration[] = [];

  @Select(MediaState.getDirectories) directories$: Observable<any[]>;
  @Select(MediaState.getDirectoryMetadata) directoryMetadata$: Observable<any[]>;
  @Select(MediaState.getMediaTreeData) mediaData$: Observable<any[]>;

  public directories: any[];
  public data: any[];
  
  constructor(private store: Store) { }

  ngOnInit() {
    // this.data = projectData;
    this.selectionOptions = { mode: 'Row', type: 'Single' };

    this.store.dispatch(new GetDirectories());
    this.directories$.subscribe(data => {
      this.directories = data;
      console.log('MediaUploadComponent ngOnInit directories: ', this.directories);
    });

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
      this.store.dispatch(new GetDirectoryMetadata(data.id));
    }
  }

  submit(value: any) {
    console.log('submit: ', value);
    console.log('submit form: ', this.dynamicForm.value);
  }
}
