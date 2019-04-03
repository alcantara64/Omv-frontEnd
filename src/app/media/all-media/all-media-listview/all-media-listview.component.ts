import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { MediaState } from '../../state/media/media.state';

@Component({
  selector: 'app-all-media-listview',
  templateUrl: './all-media-listview.component.html',
  styleUrls: ['./all-media-listview.component.css']
})
export class AllMediaListviewComponent implements OnInit {
  
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "50", field: "" },
    { headerText: "Type", field: "type", width: '100' },
    { headerText: "Name", field: "name", width: '700' },
    { headerText: "Date", field: "date" }
  ];

  // @Select(MediaState.getM) getFavoriteMedia$: Observable<Media[]>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {

    // this.store.dispatch(new GetFavorites());

    // this.getFavoriteMedia$.subscribe(favouriteMedia => {
    //   this.favouriteList = favouriteMedia;
    // });

  }

  download() {
    this.router.navigate([`/dashboard`])
  }

}
