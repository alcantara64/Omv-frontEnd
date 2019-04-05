import { Component, OnInit } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { GetUploadHistory } from '../state/admin-media/admin-media.action';

@Component({
  selector: 'app-admin-media-uploads-list',
  templateUrl: './admin-media-uploads-list.component.html',
  styleUrls: ['./admin-media-uploads-list.component.css']
})
export class AdminMediaUploadsListComponent extends ListComponent implements OnInit {

@Select(AdminMediaState.getUploadHistory) uploadHistoryMedia$: Observable<UploadHistory[]>;

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
    { headerText: "Status", field: "status" },
    { headerText: "Name", field: "name"},
    { headerText: "Destination", field: "destination"},
    { headerText: "Date", field: "date" },
    { headerText: "Size", field: "size" },
    { headerText: "File", field: "file" }
  ];

  ngOnInit() {
    this.store.dispatch(new GetUploadHistory());
  }

}
