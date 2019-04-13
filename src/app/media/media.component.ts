import { BaseComponent } from './../shared/base/base.component';
import { Component, OnInit } from '@angular/core';
import { Tab } from '../core/models/tab';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MediaState } from './state/media/media.state';
import { MediaItem } from '../core/models/entity/media';
import {AppState} from "../state/app.state";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent extends BaseComponent implements OnInit {
  public deviceWidth: number;
  public selectedItems: any[];

  mediaTabs: Tab[] = [
    { link: '/media/all', query: 'tile', name: 'All Media', isActive: true  },
    { link: '/media/favorites', query: 'tile', name: 'Favorites' },
    { link: '/media/archive', query: 'tile', name: 'Streaming Archive' }
  ];

  activeView = 'tile';
  currentRoute: any;

  @Select(MediaState.getTotalMedia) totalMedia$: Observable<number>;
  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;
  @Select(AppState.setGridData) gridData$: Observable<any[]>;


  constructor(protected store: Store, private router: Router, private route: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);

    this.deviceWidth$.subscribe(width => {
      this.deviceWidth = width;
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('MediaComponent ngOnit queryParams: ', params);
      let view = params.view;
      this.activeView = view ? view : 'tile';
    });

    this.route.params.subscribe(params => {
      console.log('MediaComponent ngOnit params: ', params);
    });
    this.gridData$.subscribe((data) => {
      this.selectedItems = data;
    })
  }

  switchTabs(tabLink: string) {
    this.router.navigate([ tabLink ], { queryParams: { view : 'tile' } });
  }

  navigateToView(view: string) {
    var url = this.router.url.split('?')[0];
    this.router.navigate([url], { queryParams: { view: view } } );
  }

  viewChange(tab) {
    this.activeView = tab;
  }

  downloadAll() {
    this.gridData$.subscribe((data) => {
      this.selectedItems = data;
      data.forEach((x) => {
        const url = x.url;
        const html = "<a id='download' href='"+ url +"' download style='display: none'></a>";
        const sample = new Blob([x.url]);
        document.writeln(html);
        document.getElementById('download').click();
        console.log('WWW', x.url);
      });
      console.log('QQQ', data);
    })
  }
}
