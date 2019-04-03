import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css']
})
export class TileViewComponent extends BaseComponent implements OnInit {

  @Input() dataSource = [];

  
  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
  }

  toggleFavoriteIcon(data: any) {
    data.isFavorite = !data.isFavorite;
    // this.dataSource.forEach((item,index )=>{
    //   console.log(item);
    //   item.isFavorite = !item.isFavorite;
    // });
  }
}
