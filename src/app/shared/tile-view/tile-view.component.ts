import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css']
})
export class TileViewComponent extends BaseComponent implements OnInit {

  @Input() dataSource = [];
  @Output() itemClick = new EventEmitter<any>();
  @Output() toggleFavorite = new EventEmitter<any>();
  @Input() pageCount;

  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
  }

  performToggleFavorite(data: any) {
    data.isFavorite = !data.isFavorite;
    // this.toggleFavorite.emit(data);
  }

  performItemClick(data: any) {
    this.itemClick.emit(data);
  }
  getItemData(data: any){
    console.log('getItemData',data )
  }
}
