import { GetDirectoryMetadata, GetDirectories, GetMediaTreeData, CreateMediaItem } from './../state/media/media.action';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionSettingsModel } from '@syncfusion/ej2-treegrid';
import { Observable, Subject } from 'rxjs';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { Store, Select } from '@ngxs/store';
import { MediaState } from '../state/media/media.state';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { Directory } from 'src/app/core/models/entity/directory';

const BROWSE = 'Browse';
const CHANGE = 'Change';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent extends BaseComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  fileName: string;
  uploadButtonText = BROWSE;
  dataSource: any;
  isFileSelected: boolean;
  isDestinationSelected: boolean;
  selectedFile: File;
  currentDirectoryId: number;
  folderPath: string;
  public directories: Directory[];

  @ViewChild('file') file;
  selectionOptions: SelectionSettingsModel;

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  metadata: FieldConfiguration[] = [];

  @Select(MediaState.getDirectories) directories$: Observable<Directory[]>;
  @Select(MediaState.getDirectoryMetadata) directoryMetadata$: Observable<any[]>;
  @Select(MediaState.getMediaTreeData) mediaData$: Observable<any[]>;

  public data: any[];

  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
    this.selectionOptions = { mode: 'Row', type: 'Single' };

    this.store.dispatch(new GetDirectories());
    this.directories$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.directories = data;
      });

    this.directoryMetadata$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.metadata = data;
      });
  }

  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.selectedFile = files[0];
    if (this.selectedFile) {
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
      this.currentDirectoryId = data.id;
      this.folderPath = '';
      this.buildFolderPath(data.id);
      this.store.dispatch(new GetDirectoryMetadata(data.id));
    }
  }

  submit(value?: any) {
    if (this.dynamicForm) {
      console.log('submit form: ', this.dynamicForm.value);
      if (!this.dynamicForm.valid) return;
    }
    let metadata = this.dynamicForm ? JSON.stringify(this.dynamicForm.value) : "";

    this.ShowSpinner(true);
    this.store.dispatch(new CreateMediaItem(this.currentDirectoryId, this.selectedFile, metadata));
    this.ShowSpinner(false);
  }

  private buildFolderPath(directoryId: number) {
    let directory = this.directories.find(x => x.id === directoryId);
    let parent = this.directories.find(x => x.id === directory.parentId);
    if (parent) {
      this.folderPath = this.folderPath ? `${directory.name} > ${this.folderPath}` : `${directory.name}`;
      return this.buildFolderPath(parent.id);
    }
    return this.folderPath = this.folderPath ? `${directory.name} > ${this.folderPath}` : `${directory.name}`;
  }
}
