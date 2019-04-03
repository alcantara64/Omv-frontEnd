import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-favorites-treeview',
  templateUrl: './media-favorites-treeview.component.html',
  styleUrls: ['./media-favorites-treeview.component.css']
})
export class MediaFavoritesTreeviewComponent implements OnInit {

  public mediaFavoriteDate: Object[];

  constructor() { }

  ngOnInit() {
    this.mediaFavoriteDate =
      [
        {
          id: 1,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12"
        },
        {
          id: 2,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12",
          parentID: 1
        },
        {
          id: 3,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12",
          parentID: 2
        },
        {
          id: 4,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12",
          parentID: 3
        },
        {
          id: 5,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12",
          parentID: 3
        },
        {
          id: 6,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12",
          parentID: 3
        },
        {
          id: 7,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12",
          parentID: 3
        },
        {
          id: 8,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12"
        },
        {
          id: 9,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12"
        },
        {
          id: 10,
          name: "Parent Folder Title",
          date: "Jan 30, 2018 10:15:12"
        }
      ];
  }

}
