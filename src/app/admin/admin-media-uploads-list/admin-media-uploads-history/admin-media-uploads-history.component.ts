import { Component, OnInit } from '@angular/core';
import {GridColumn} from "../../../core/models/grid.column";
import {Select} from "@ngxs/store";
import {MediaState} from "../../../media/state/media/media.state";
import {Observable} from "rxjs";
import {Directory} from "../../../core/models/entity/directory";
import {AdminMediaState} from "../../state/admin-media/admin-media.state";
import {UploadHistory} from "../../../core/models/entity/uploadhistory";

@Component({
  selector: 'app-admin-media-uploads-history',
  templateUrl: './admin-media-uploads-history.component.html',
  styleUrls: ['./admin-media-uploads-history.component.css']
})
export class AdminMediaUploadsHistoryComponent implements OnInit {
  @Select(AdminMediaState.getUploadHistory) uploadHistoryMedia$: Observable<UploadHistory[]>;

  total: number;
  columns: GridColumn[] = [
    { headerText: '  ', field: ' ', width: '10' },
    { headerText: 'Source', field: 'source' },
    { headerText: 'Destination', field: 'destination' },
    { headerText: 'Date', field: 'modifiedOnString' },
    { headerText: 'Size', field: 'sizeDisplay' },
    { headerText: '#Files', field: 'files' },
  ];
  historyMedia: UploadHistory[];

  constructor() { }

  ngOnInit() {
    this.uploadHistoryMedia$.subscribe(historyMedia=>{
      this.historyMedia = historyMedia;
    })
  }

}
