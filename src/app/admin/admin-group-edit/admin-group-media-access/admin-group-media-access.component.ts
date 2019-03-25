import { Component, OnInit } from '@angular/core';
import { AdminGroupState } from '../../admin-groups-list/state/admin-groups.state';
import { Observable } from 'rxjs';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Select, Store } from '@ngxs/store';
import { GetMediaAccess } from '../../admin-groups-list/state/admin.groups.action';
import { DataManager, JsonAdaptor, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-admin-group-media-access',
  templateUrl: './admin-group-media-access.component.html',
  styleUrls: ['./admin-group-media-access.component.css']
})
export class AdminGroupMediaAccessComponent implements OnInit {
  @Select(AdminGroupState.getMediaAccess) getMediaAccess$: Observable<MediaAccess[]>;
  mediaAccess: MediaAccess[];
  public field: Object;
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetMediaAccess());

    this.getMediaAccess$.subscribe(mediaAccess => (this.mediaAccess = mediaAccess));
    this.field = { dataSource: this.mediaAccess, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    // this.query = new Query().select('id,name').take(5);
    // this.query1 = new Query().select('childid,childname').take(2);
    // this.field = {
    //   dataSource: this.mediaAccess, id: 'id', text: 'name', query:this.query, hasChildren: 'id',
    //   child: { dataSource: this.mediaAccess, id: 'childid',query:this.query1, parentID: 'id', text: 'childname' }
    // };
    
    console.log('field',  this.field);
  }
  show(args): void {
    let popup: HTMLElement = document.getElementById('loading');
    popup.style.display = '';
  }
  // Hide loading message, after tree data has been loaded
  public hide(args): void {
    let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
    popup.style.display = 'none';
  }
}
