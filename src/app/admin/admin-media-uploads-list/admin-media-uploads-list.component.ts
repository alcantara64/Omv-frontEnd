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
import {AppState} from "../../state/app.state";

@Component({
  selector: 'app-admin-media-uploads-list',
  templateUrl: './admin-media-uploads-list.component.html',
  styleUrls: ['./admin-media-uploads-list.component.css']
})
export class AdminMediaUploadsListComponent extends ListComponent implements OnInit {

  newUpload =
    [
      {
        "id": 1,
        "documentName": "Upload Number 1",
        "metadata": "South America / Trinidad / T&T",
        "modifiedOnString": "Jan 30, 2018 10:15:12",
        "size": "1GB",
        "files": 100,
      },
      {
        "id": 2,
        "documentName": "Upload Number 1",
        "metadata": "South America / Trinidad / T&T",
        "modifiedOnString": "Jan 30, 2018 10:15:12",
        "size": "1GB",
        "files": 100,
      },
      {
        "id": 3,
        "documentName": "Upload Number 1",
        "metadata": "South America / Trinidad / T&T",
        "modifiedOnString": "Jan 30, 2018 10:15:12",
        "size": "1GB",
        "files": 100,
      },
      {
        "id": 4,
        "documentName": "Upload Number 1",
        "metadata": "South America / Trinidad / T&T",
        "modifiedOnString": "Jan 30, 2018 10:15:12",
        "size": "1GB",
        "files": 100,
      },
      {
        "id": 5,
        "documentName": "Upload Number 1",
        "metadata": "South America / Trinidad / T&T",
        "modifiedOnString": "Jan 30, 2018 10:15:12",
        "size": "1GB",
        "files": 100,
      },

    ];
  showStatusIcon = true;
  @Select(AdminMediaState.getUploadHistory) uploadHistoryMedia$: Observable<UploadHistory[]>;
  @Select(MediaState.getDirectories) directory$ : Observable<Directory[]>;
  @Select(AppState.getDeviceWidth) deviceWidth$: Observable<number>;

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
    { headerText: 'Name', field: 'documentName' },
    { headerText: 'Destination', field: 'metadata' },
    { headerText: 'Date', field: 'modifiedOnString' },
    { headerText: 'Size (KB)', field: 'size' },
    { headerText: '#Files', field: 'files' },
  ];

  ngOnInit() {
    this.store.dispatch(new GetUploadHistory());
    this.store.dispatch(new GetDirectories());
    this.directory$.subscribe(directory => {
      this.directories = directory;
    });
    this.uploadHistoryMedia$.subscribe(historyMedia => {
      this.total = historyMedia.length;
    });
  }
}

