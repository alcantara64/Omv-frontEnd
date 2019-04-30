import { Component, OnInit } from '@angular/core';
import { GridColumn } from "../../../core/models/grid.column";
import { Select, Store } from "@ngxs/store";
import { AppState } from "../../../state/app.state";
import { Observable } from "rxjs";
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { AdminMediaState } from '../../state/admin-media/admin-media.state';
import { ListComponent } from 'src/app/shared/list/list.component';
import { GetNewUploads, ApproveUploads, RejectUploads } from '../../state/admin-media/admin-media.action';
import { UploadRequest } from 'src/app/core/models/entity/upload-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-media-new-uploads',
  templateUrl: './admin-media-new-uploads.component.html',
  styleUrls: ['./admin-media-new-uploads.component.css']
})
export class AdminMediaNewUploadsComponent extends ListComponent implements OnInit {
  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;
  @Select(AdminMediaState.getNewUploads) newUploads$: Observable<UploadHistory[]>;
  public deviceWidth: number;
  selectedUploads: UploadHistory[];
  newUploads: UploadHistory[];
  public editIcon = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";

  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '50', field: '' },
    { headerText: 'Source', field: 'source' },
    { headerText: 'Destination', field: 'destination' },
    { headerText: 'Date', field: 'modifiedOnString' },
    { headerText: 'Size (KB)', field: 'size' }
  ];

  constructor(protected store: Store, private router: Router) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(new GetNewUploads());
    this.newUploads$.subscribe(newUploads => {
      this.newUploads = newUploads;
      console.log('ngOnInit newUploads ', this.newUploads);
    });
    this.deviceWidth$.subscribe(width => {
      this.deviceWidth = width;
    });
  }

  approve(payload: UploadHistory[]) {
    payload.forEach((data) =>{
    this.store.dispatch(new ApproveUploads(data.id, true ));
    }
    );
  }
  reject(payload: UploadHistory[]) {
     payload.forEach((data) =>{
      this.store.dispatch(new RejectUploads(data.id, true));
      }
      );
  }
  edit(data?: UploadHistory) {
    if (!data) {
      this.router.navigate([`/admin/uploads//details`]);
    } else {
      this.router.navigate([`/admin/media/uploads/${data.uploadRequestId}/details`]);
    }
  }
}
