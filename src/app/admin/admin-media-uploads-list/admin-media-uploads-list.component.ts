import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  public data: any[];
  public tabView: string;
  public deviceWidth: number;

  showStatusIcon = true;
  @Select(MediaState.getDirectories) directory$ : Observable<Directory[]>;

  total: number;
  directories: Directory[];
  folderPath: string;

  constructor(
    protected store: Store,
    protected router: Router  ) {
    super(store);
    this.ShowLefNav(true);
    this.PageTitle('Admin User');
  }

  ngOnInit() {
    this.store.dispatch(new GetUploadHistory());
    this.store.dispatch(new GetDirectories());
    this.directory$.subscribe(directory => {
      this.directories = directory;
    });
  }

}

