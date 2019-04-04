import { BaseComponent } from './../../shared/base/base.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewType } from 'src/app/core/constants/view-type';
import { Store, Select } from '@ngxs/store';
import { MediaState } from '../state/media/media.state';
import { Observable } from 'rxjs';
import { EmitType } from '@syncfusion/ej2-base';
import { GetMedia } from '../state/media/media.action';

const TILE_VIEW = 'tile';
const LIST_VIEW = 'list';
const TREE_VIEW = 'tree';
const MAP_VIEW = 'map';

@Component({
  selector: 'app-all-media',
  templateUrl: './all-media.component.html',
  styleUrls: ['./all-media.component.css']
})
export class AllMediaComponent extends BaseComponent implements OnInit, AfterViewInit {

  viewType: string;
  @Select(MediaState.getTotalMedia) totalMedia$: Observable<number>;
  totalMedia: number;
  constructor(protected store: Store, private route: ActivatedRoute) {
    super(store);
  }

  ngOnInit() {
    this.totalMedia$.subscribe(totalMedia => this.totalMedia = totalMedia);
    this.route.queryParams.subscribe(
      params => {
        this.viewType = params['view'] ? params['view'] : ViewType.TILE;
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      var nextIcon:  NodeListOf<HTMLElement> = document.querySelectorAll('div.e-mlast.e-icons.e-icon-last.e-lastpage.e-pager-default');
      var lastNextIcon = document.querySelectorAll('div.e-last.e-icons.e-icon-last.e-lastpagedisabled.e-disable');
      console.log(nextIcon);
      console.log(lastNextIcon);
        nextIcon[0].style.display = 'none';
  
      console.log(nextIcon);
    }, 500);
  }

  performClick(event): EmitType<object> {
    if (event.currentPage) {
      this.store.dispatch(new GetMedia(event.currentPage));
      console.log(event);
    }
    return event;
  }


}
