import { GetFavorites, GetMedia } from '../../state/media/media.action';
import { Component, OnInit } from '@angular/core';
import {GridColumn} from "../../../core/models/grid.column";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {MediaState} from "../../state/media/media.state";
import {MediaItem} from "../../../core/models/entity/media";
import {Router} from "@angular/router";

@Component({
  selector: 'app-media-favorites-listview',
  templateUrl: './media-favorites-listview.component.html',
  styleUrls: ['./media-favorites-listview.component.css']
})

export class MediaFavoritesListviewComponent implements OnInit {
  @Select(MediaState.getFavorites) favoriteMedia$: Observable<MediaItem[]>;

  favouriteMedia;
  editIcon = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";

  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "50", field: "" },
    { headerText: "Type", field: "type", width: '100' },
    { headerText: "Name", field: "name", width: '700' },
    { headerText: "Date", field: "date" }
  ];

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetFavorites());
  }

  download() {
    // this.router.navigate([`/dashboard`])
  }
}
