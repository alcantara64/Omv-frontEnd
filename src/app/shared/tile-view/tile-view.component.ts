import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css']
})
export class TileViewComponent extends BaseComponent implements OnInit {
  public selectedItems: any[] = [];

  @Input() dataSource = [];
  @Output() itemClick = new EventEmitter<any>();
  @Output() selectedItemData = new EventEmitter<any>();
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

  getItemData(data: any) {
    console.log('ZZZ', data);
    const isAlreadySelected = this.selectedItems.filter(x => x.id === data.id);
    if (isAlreadySelected.length === 0) {
      this.selectedItems.push(data);
      this.selectedItemData.emit(this.selectedItems);
    }else {
      this.selectedItems.splice( this.selectedItems.indexOf(data), 1 );
      this.selectedItemData.emit(this.selectedItems);
    }
  }
}
