import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { GetUploadHistory } from '../state/admin-media/admin-media.action';
import { MediaState } from 'src/app/media/state/media/media.state';
import { Directory } from 'src/app/core/models/entity/directory';
import { GetDirectories } from 'src/app/media/state/media/media.action';

@Component({
  selector: 'app-admin-media-uploads-list',
  templateUrl: './admin-media-uploads-list.component.html',
  styleUrls: ['./admin-media-uploads-list.component.css']
})
export class AdminMediaUploadsListComponent extends ListComponent implements OnInit {
  showStatusIcon = true;
  @Select(AdminMediaState.getUploadHistory) uploadHistoryMedia$: Observable<UploadHistory[]>;
  @Select(MediaState.getDirectories) directory$ : Observable<Directory[]>;
  total: number;
  directories: Directory[];
  folderPath: string;

  constructor(
    protected store: Store,
    protected router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(store);
    this.ShowLefNav(true);
    this.PageTitle('Admin User');
  }
  columns: GridColumn[] = [
    { headerText: "Status ", field: " ", width: "5" },
    { headerText: "Name", field: "documentName" },
    { headerText: "Destination", field: "folderPath" },
    { headerText: "Date", field: "date" },
    { headerText: "Size", field: "size" }
  ];

  ngOnInit() {
    this.store.dispatch(new GetUploadHistory());
    this.store.dispatch(new GetDirectories());
    this.directory$.subscribe(directory => {
      this.directories = directory;
    });
    this.uploadHistoryMedia$.subscribe(historyMedia => {
      this.total = historyMedia.length;
      if (historyMedia) {
        historyMedia.forEach((item, index) => {
          this.buildFolderPath(item.directoryId);
        });
      }
    });
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

