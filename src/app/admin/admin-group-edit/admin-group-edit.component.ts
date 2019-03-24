import { Tab } from 'src/app/core/models/tab';
import { GetGroups, GetGroup, CreateGroup, UpdateGroup, EnableGroup, DisableGroup } from './../admin-groups-list/state/admin.groups.action';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';
import { GetUsers } from "../admin-users-list/state/admin-users.actions";
import { AdminUserState } from "../admin-users-list/state/admin-users.state";
import { Observable } from "rxjs";
import { User } from "../../core/models/user";
import { ListComponent } from "../../shared/list/list.component";
import { GridColumn } from "../../core/models/grid.column";
import { Group } from 'src/app/core/models/group';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AdminGroupState } from '../admin-groups-list/state/admin-groups.state';
import { AdminGroupStatus } from 'src/app/core/enum/admin-user-status';

const CREATE_GROUP = 'Create Group';
const UPDATE_GROUP = 'Update Group';
const ENABLE_GROUP = 'Enable Group';
const DISABLE_GROUP = 'Disable Group';
const PERMISSIONS_TAB = 0;
const MEMBERS_TAB = 1;
const MEDIA_ACCESS = 2;

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})
export class AdminGroupEditComponent extends ListComponent implements OnInit {

  componentActive = true;
  showPermissions: boolean;
  showMembers: boolean;
  showMediaAccess: boolean;
  
  groupId: number;
  groupForm: FormGroup;
  group = new Group();
  groupItemTabs: Tab[] = [
    { link: PERMISSIONS_TAB, name: 'Permissions' },
    { link: MEMBERS_TAB, name: 'Members' },
    { link: MEDIA_ACCESS, name: 'Media Access' }
  ];
  groupActionText: string;
  createGroupButtonText: string;
  errorMessage: string;

  @Select(AdminGroupState.getCurrentGroup) currentGroup$: Observable<Group>;
  @Select(AdminGroupState.getCurrentGroupId) currentGroupId$: Observable<number>;

  constructor(protected store: Store, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super(store);

    this.store.dispatch(new ShowLeftNav(false));
  }

  ngOnInit() {

    // Initialize the groupForm
    this.groupForm = this.fb.group({
      id: [''],
      name: [ '', [ Validators.required ] ],
      description: [ '' ]
    });

    // Get the id in the browser url and reach out for the group
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(new GetGroup(this.groupId));
      this.createGroupButtonText = this.groupId ? UPDATE_GROUP : CREATE_GROUP;
    }), 
    takeWhile(() => this.componentActive);

    // Get the current group
    this.currentGroup$.subscribe(group => {      
      if (group) { // Existing Group
        this.groupActionText = group.status == AdminGroupStatus.Active ? DISABLE_GROUP : ENABLE_GROUP;        
        this.groupForm = this.fb.group({
          id: group.id,
          name: [ group.name, [ Validators.required ] ],
          description: [ group.description, [ Validators.required ] ]
        });
        this.group = group;
      }
    }),
    takeWhile(() => this.componentActive);

    this.setActiveTab(PERMISSIONS_TAB);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  async save() {
    if (this.groupForm.valid) {
      if (this.groupForm.dirty) {
        const updatedGroup: Group = { ...this.group, ...this.groupForm.value };

        if (this.groupId === 0) { 
          await this.store.dispatch(new CreateGroup(updatedGroup));
          this.currentGroupId$.subscribe(groupId => {
            if (groupId) 
              this.router.navigate([`/admin/groups/${groupId}/edit`])
          }),
          takeWhile(() => this.componentActive);
        } else {
          await this.store.dispatch(new UpdateGroup(updatedGroup.id, updatedGroup));          
          this.groupForm.reset(this.groupForm.value);          
        }        
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  changeStatus() {
    if (this.groupActionText === ENABLE_GROUP) {
      this.store.dispatch(new EnableGroup(this.groupId, this.group));
      this.groupActionText = DISABLE_GROUP;
    } else {
      this.store.dispatch(new DisableGroup(this.groupId, this.group));
      this.groupActionText = ENABLE_GROUP;
    }
  }

  switchTabs(tabLink: any) {
    this.clearActiveTab();
    this.setActiveTab(tabLink);
  }

  setActiveTab(tabIndex: number) {
    switch (tabIndex) {
      case PERMISSIONS_TAB:
        this.showPermissions = true;
        break;
      case MEMBERS_TAB:
        this.showMembers = true;
        break;
      case MEDIA_ACCESS:
        this.showMediaAccess = true;
        break;    
      default:
        break;
    }
    this.groupItemTabs[tabIndex].isActive = true;
  }

  clearActiveTab() {
    this.showPermissions = this.showMembers = this.showMediaAccess = false;
    this.groupItemTabs.map(x => x.isActive = false);
  }
}
