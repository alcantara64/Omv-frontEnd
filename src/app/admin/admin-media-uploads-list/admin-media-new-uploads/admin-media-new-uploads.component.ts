import { Component, OnInit } from '@angular/core';
import { GridColumn } from "../../../core/models/grid.column";
import { Select, Store } from "@ngxs/store";
import { AppState } from "../../../state/app.state";
import { Observable } from "rxjs";
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { AdminMediaState } from '../../state/admin-media/admin-media.state';
import { ListComponent } from 'src/app/shared/list/list.component';
import { GetNewUploads, ApproveUploads, RejectUploads } from '../../state/admin-media/admin-media.action';

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

  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '50', field: '' },
    { headerText: 'Name', field: 'documentName' },
    { headerText: 'Destination', field: 'metadata' },
    { headerText: 'Date', field: 'modifiedOnString' },
    { headerText: 'Size (KB)', field: 'size' }
  ];

  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
    // this.store.dispatch(new GetNewUploads());
    this.newUploads$.subscribe(newUploads => {
      this.newUploads = newUploads;
      console.log('ngOnInit newUploads ', this.newUploads);
    });
    this.deviceWidth$.subscribe(width => {
      this.deviceWidth = width;
    });
  }

  approve(payload: UploadHistory) {
    console.log('AdminMediaNewUploadsComponent - approve', payload);
    this.store.dispatch(new ApproveUploads(payload.id, payload));
  }
  reject(payload: UploadHistory) {
    console.log('AdminMediaNewUploadsComponent - reject', payload);
    this.store.dispatch(new RejectUploads(payload.id, payload));
  }
}
