import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.css']
})
export class MediaViewerComponent implements OnInit {

  public src = [
    {
      "id": "1",
      "type": "PDF",
      "name": "BRAZOS INSPECTION REPORT ",
      "isFavorite": true,
      "mediaPath":"../../../assets/images/oceaneering-nautilus-bell.jpg",
      "date": "Jan 30, 2018  "
    },
    {
      "id": "2",
      "type": "PDF",
      "name": "URSA INSPECTION REPORT  ",
      "isFavorite": false,
      "mediaPath":"../../../assets/syncfusion-angular.pdf",
      "date": "Jan 30, 2018  "
    },
    {
      "id": "3",
      "type": "PDF",
      "name": "URSA INSPECTION REPORT  ",
      "isFavorite": true,
      "mediaPath":"../../../assets/images/oceaneering-nautilus-bell.jpg",
      "date": "Jan 30, 2018  "
    },
    {
      "id": "4",
      "type": "PDF",
      "name": "URSA INSPECTION REPORT ",
      "isFavorite": true,
      "mediaPath":"../../../assets/images/oceaneering-nautilus-bell.jpg",
      "date": "Jan 30, 2018 "
    },
    {
      "id": "5",
      "type": "PDF",
      "name": "URSA INSPECTION REPORT 2",
      "isFavorite": false,
      "mediaPath":"../../../assets/syncfusion-angular.pdf",
      "date": "Jan 30, 2018 "
    },
    {
      "id": "8",
      "type": "PDF",
      "name": "URSA INSPECTION REPORT 3",
      "isFavorite": false,
      "mediaPath":"../../../assets/images/oceaneering-nautilus-bell.jpg",
      "date": "Jan 30, 2018 "
    },
    {
      "id": "9",
      "type": "PDF",
      "name": "BRAZOS INSPECTION REPORT",
      "isFavorite": true,
      "mediaPath":"../../../assets/syncfusion-angular.pdf",
      "date": "Jan 30, 2018 "
    }
  ];
  public mediaOBJ: any;
  public media: string;
  public mediaType: string;
  public mediaSource: string;

  constructor(private store: Store, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const mediaID = this.activeRoute.snapshot.paramMap.get('id');
    this.mediaOBJ = this.src.find(x => (x.id == mediaID));
    this.mediaSource = this.mediaOBJ.mediaPath;
    this.mediaOBJ = this.mediaSource.split('.');
    this.mediaType = this.mediaOBJ[this.mediaOBJ.length - 1];
  }

}
