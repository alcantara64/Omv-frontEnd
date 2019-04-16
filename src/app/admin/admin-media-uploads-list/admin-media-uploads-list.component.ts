import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { GetUploadHistory, GetNewUploads } from '../state/admin-media/admin-media.action';
import { MediaState } from 'src/app/media/state/media/media.state';
import { Directory } from 'src/app/core/models/entity/directory';
import { GetDirectories } from 'src/app/media/state/media/media.action';
import {AppState} from "../../state/app.state";
import {AdminGroupType} from "../../core/enum/admin-user-type";
// import {GetGroups} from "../state/admin-groups/admin.groups.action";

@Component({
  selector: 'app-admin-media-uploads-list',
  templateUrl: './admin-media-uploads-list.component.html',
  styleUrls: ['./admin-media-uploads-list.component.css']
})
export class AdminMediaUploadsListComponent extends ListComponent implements OnInit {

  public data: any[];
  public tabView: string;
  public deviceWidth: number;

  showStatusIcon = true;
  @Select(MediaState.getDirectories) directory$ : Observable<Directory[]>;
  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;

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

  ngOnInit() {
    this.store.dispatch(new GetUploadHistory());
    this.store.dispatch(new GetNewUploads());
    this.store.dispatch(new GetDirectories());
    this.directory$.subscribe(directory => {
      this.directories = directory;
    });
  }

}

