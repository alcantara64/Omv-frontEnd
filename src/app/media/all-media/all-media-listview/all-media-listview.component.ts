import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { MediaState } from '../../state/media/media.state';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/core/models/entity/media';
import { GetMedia, SetSelectedItems } from '../../state/media/media.action';
import { EmitType } from '@syncfusion/ej2-base';
declare var require: any

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
  selectedItemRecords : any;
  pageSize = 100;
  totalMedia: number;
  pageCount: number;

  @Select(MediaState.getMedia) media$: Observable<MediaItem[]>;
  @Select(MediaState.getTotalMedia) totalMedia$: Observable<number>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetMedia(1, this.pageSize));
    this.totalMedia$.subscribe(totalMedia => {
      this.totalMedia = totalMedia;
      this.pageCount = Math.ceil(this.totalMedia / this.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  selectedItemData(data: any[]) {
    console.log('records',this.selectedItemRecords);
    this.store.dispatch(new SetSelectedItems(data));
  }

  download(data: MediaItem) {
    var FileSaver = require('file-saver');
    FileSaver.saveAs(data.url, data.name);
  }
  
  navigate(data: MediaItem) {
    this.router.navigate([`media/${data.documentId}/details`]);
  }

  changePage(event): EmitType<object> {
    if (event.currentPage) {
      this.store.dispatch(new GetMedia(event.currentPage, this.pageSize));
      console.log(event);
    }
    return event;
  }
}
