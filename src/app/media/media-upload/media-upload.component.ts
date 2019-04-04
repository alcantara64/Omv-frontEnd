import { Component, OnInit, ViewChild } from '@angular/core';
import { projectData } from './data';
import { SelectionSettingsModel } from '@syncfusion/ej2-treegrid';
import { RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { MetadataService } from 'src/app/shared/dynamic-form/metadata.service';
import { Observable } from 'rxjs';

const BROWSE = 'Browse';
const CHANGE = 'Change';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css'],
  providers:  [MetadataService]
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

  metadatas$: Observable<any[]>;
  metadatas1$: Observable<any[]>;
  metadata: any[] = [];
  
  constructor(private service: MetadataService) {
    this.metadata = service.getMetadata();
   }

  ngOnInit() {
    this.data = projectData;
    this.selectionOptions = { mode: 'Row', type: 'Single' };
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
}
