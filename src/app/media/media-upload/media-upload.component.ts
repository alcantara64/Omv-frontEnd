import { Component, OnInit, ViewChild } from '@angular/core';
import { projectData } from './data';
import { SelectionSettingsModel } from '@syncfusion/ej2-treegrid';

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

  data: Object[];

  @ViewChild('file') file;
  selectionOptions: SelectionSettingsModel;
  
  constructor() { }

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
    }
  }
}
