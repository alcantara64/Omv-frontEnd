import { Component, OnInit } from '@angular/core';
import {GridColumn} from "../../../core/models/grid.column";
import {Select} from "@ngxs/store";
import {AppState} from "../../../state/app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-media-new-uploads',
  templateUrl: './admin-media-new-uploads.component.html',
  styleUrls: ['./admin-media-new-uploads.component.css']
})
export class AdminMediaNewUploadsComponent implements OnInit {
  @Select(AppState.getDeviceWidth) deviceWidth$: Observable<number>;
  public deviceWidth: number;

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

  columns: GridColumn[] = [
    { type: 'checkbox', headerText: 'Select All', width: '50', field: '' },
    { headerText: 'Name', field: 'documentName' },
    { headerText: 'Destination', field: 'metadata' },
    { headerText: 'Date', field: 'modifiedOnString' },
    { headerText: 'Size (KB)', field: 'size' },
    { headerText: '#Files', field: 'files' },
  ];

  constructor() { }

  ngOnInit() {
    this.deviceWidth$.subscribe(width => {
      this.deviceWidth = width;
    })
  }

}
