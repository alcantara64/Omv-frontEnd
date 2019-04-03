import { GetMedia } from '../../state/media/media.action';
import { Component, OnInit } from '@angular/core';
import {GridColumn} from "../../../core/models/grid.column";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {MediaState} from "../../state/media/media.state";
import {Media} from "../../../core/models/entity/media";

@Component({
  selector: 'app-media-favorites-listview',
  templateUrl: './media-favorites-listview.component.html',
  styleUrls: ['./media-favorites-listview.component.css']
})

export class MediaFavoritesListviewComponent implements OnInit {
  @Select(MediaState.getFavoriteMedia) getFavoriteMedia$: Observable<Media[]>;

  public favouriteList;

  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "50", field: "" },
    { headerText: "Type", field: "type", width: '180' },
    { headerText: "Name", width: '170', field: "name" },
    { headerText: "Date", field: "date" }
  ];

  constructor(private store: Store) { }

  ngOnInit() {

    this.store.dispatch(new GetMedia());

    this.getFavoriteMedia$.subscribe(favouriteMedia => {
      this.favouriteList = favouriteMedia;
    });

  }

}
