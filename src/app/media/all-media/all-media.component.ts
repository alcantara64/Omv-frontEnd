import { BaseComponent } from './../../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewType } from 'src/app/core/constants/view-type';
import { Store } from '@ngxs/store';

const TILE_VIEW = 'tile';
const LIST_VIEW = 'list';
const TREE_VIEW = 'tree';
const MAP_VIEW = 'map';

@Component({
  selector: 'app-all-media',
  templateUrl: './all-media.component.html',
  styleUrls: ['./all-media.component.css']
})
export class AllMediaComponent extends BaseComponent implements OnInit {

  viewType: string;
 
  constructor(protected store: Store, private route: ActivatedRoute) {
    super(store);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.viewType = params['view'] ? params['view'] : ViewType.TILE; 
      }
    );
  }
}
