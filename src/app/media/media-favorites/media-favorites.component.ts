import { BaseComponent } from './../../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ViewType } from 'src/app/core/constants/view-type';

@Component({
  selector: 'app-media-favorites',
  templateUrl: './media-favorites.component.html',
  styleUrls: ['./media-favorites.component.css']
})
export class MediaFavoritesComponent extends BaseComponent implements OnInit {

  viewType: string;

  constructor(protected store: Store, private route: ActivatedRoute) {
    super(store);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.log(params['view']);
        this.viewType = params['view'] ? params['view'] : ViewType.TILE; 
    });
  }
}
