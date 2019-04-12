import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/core/models/entity/media';
import { GetMedia } from '../../state/media/media.action';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-all-media-listview',
  templateUrl: './all-media-listview.component.html',
  styleUrls: ['./all-media-listview.component.css']
})
export class AllMediaListviewComponent implements OnInit, OnDestroy {

  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "50", field: "" },
    { headerText: "Type", field: "type", width: '95' },
    { headerText: "Name", field: "name", width: '700' },
    { headerText: "Date", field: "modifiedOnString" }
  ];
  media: MediaItem[];
  componentActive = true;
  editIcon = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";

  @Select(MediaState.getMedia) media$: Observable<MediaItem[]>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetMedia(1));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  download(arg: any) {
    console.log("this is the arg", arg);
    window.location.href = `${arg.metadata}`;
  }

}
