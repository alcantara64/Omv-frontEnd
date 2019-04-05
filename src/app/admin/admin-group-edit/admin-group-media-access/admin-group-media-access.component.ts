import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminGroupState } from '../../state/admin-groups/admin-groups.state';
import { Observable } from 'rxjs';
import { MediaAccess } from 'src/app/core/models/media-access';
import { Select, Store } from '@ngxs/store';
import { DataManager, JsonAdaptor, Query, ODataV4Adaptor, WebApiAdaptor } from '@syncfusion/ej2-data';
import { GetMediaAccess, GetRoleMediaAccess, UpdateGroupPermissions, UpdateRoleMediaAccess } from '../../state/admin-groups/admin.groups.action';
import { EmitType } from '@syncfusion/ej2-base';
import { NodeExpandEventArgs, NodeClickEventArgs, NodeSelectEventArgs, DataBoundEventArgs } from '@syncfusion/ej2-navigations';
import { AdminMediaAccessService } from 'src/app/core/services/business/admin-media-access/admin-media-access.service';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Role_GetDirectoriesByIdOutputDTO } from 'src/app/core/dtos/output/roles/Role_GetDirectoriesByIdOutputDTO';
import { Directory_GetAllOutputDTO } from 'src/app/core/dtos/output/directories/Directory_GetAllOutputDTO';

@Component({
  selector: 'app-admin-group-media-access',
  templateUrl: './admin-group-media-access.component.html',
  styleUrls: ['./admin-group-media-access.component.css', '../../../app.component.css']
})
export class AdminGroupMediaAccessComponent implements OnInit {
  @ViewChild('tree') tree: TreeViewComponent;
  @Select(AdminGroupState.getMediaAccess) getMediaAccess$: Observable<MediaAccess[]>;
  @Select(AdminGroupState.getRoleMediaAccessIds) currentGroupMediaAccessIds$: Observable<number[]>

  public mediaAccess: Role_GetDirectoriesByIdOutputDTO[] = [];
  public field: Object;
  public dataManager: any;
  groupId: number;
  checkedNode: string[] = [];

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private adminMediaService: AdminMediaAccessService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(new GetRoleMediaAccess(this.groupId));
    }
    );

    this.adminMediaService.getMediaAccess().subscribe(data => {
      this.mediaAccess = data;
      this.mediaAccess.forEach(item => {
        item.icon = 'folder';
        if (item.directoryParentId === 0) {
          item.directoryParentId = undefined;
        }
        if (this.checkedNode.map(v => parseInt(v)).includes(item.directoryId)) {
          item.isChecked = true;
          item.expanded = true;
        }
      });

      console.log(this.mediaAccess);
      this.field = {
        dataSource: this.mediaAccess, id: 'directoryId', parentID: 'directoryParentId',
        text: 'directoryName',  iconCss: 'icon', hasChildren: 'hasChild'
      };
    });
  }

  dataBound(evt: DataBoundEventArgs) {

      this.currentGroupMediaAccessIds$.subscribe((checkedNodes) => {
          this.checkedNode = checkedNodes.map(String);
      });

  }

  nodeChecked(args: any): void {

    console.log('The checked node\'s id is: ' + this.tree.checkedNodes);
    console.log('selected child nodes', this.tree.getAllCheckedNodes());
  }

  show: EmitType<EmitType<NodeClickEventArgs>> = (args) => {

    let popup: HTMLElement = document.getElementById('loading');
    popup.style.display = '';
  }
  // Hide loading message, after tree data has been loaded
  public hide(args): void {
    let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
    popup.style.display = 'none';
  }

  updateMediaAccess() {
    this.checkedNode = this.tree.getAllCheckedNodes();
    var ids = this.checkedNode.map(v => parseInt(v));
    this.store.dispatch(new UpdateRoleMediaAccess(this.groupId, ids)).toPromise().then(() => {
      this.store.dispatch(new GetRoleMediaAccess(this.groupId));
    });
  }
}
