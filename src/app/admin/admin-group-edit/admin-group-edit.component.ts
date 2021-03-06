import {GroupStatus as GroupStatus} from './../../core/enum/group-status.enum';
import {Tab} from 'src/app/core/models/tab';
import {
  ClearGroup,
  CreateGroup,
  DisableGroup,
  EnableGroup,
  GetGroup,
  UpdateGroup
} from '../state/admin-groups/admin-groups.action';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable} from "rxjs";
import {Group} from 'src/app/core/models/entity/group';
import {ActivatedRoute, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {AdminGroupState} from '../state/admin-groups/admin-groups.state';
import {EditComponent} from 'src/app/shared/edit/edit.component';
import { permission } from 'src/app/core/enum/permission';

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
  styleUrls: ['./admin-group-edit.component.css', './../../app.component.css']
})
export class AdminGroupEditComponent extends EditComponent implements OnInit {

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

  @ViewChild('checkbox') checkbox;

  @Select(AdminGroupState.getCurrentGroup) currentGroup$: Observable<Group>;
  @Select(AdminGroupState.getCurrentGroupId) currentGroupId$: Observable<number>;

  constructor(protected store: Store,
    protected router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
    super(store, router);
    this.Permission = permission.VIEW_GROUP_EDIT;
    this.ShowLefNav(false);
    this.PageTitle('Admin Group Edit');
  }

  ngOnInit() {
    // Initialize the groupForm
    this.groupForm = this.fb.group({
      id: '',
      name: [ '', [ Validators.required ] ],
      description: ''
    });

    // Get the id in the browser url and reach out for the group
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      if (this.groupId) {
        this.store.dispatch(new GetGroup(this.groupId));
        this.createGroupButtonText = UPDATE_GROUP;
      } else {
        this.store.dispatch(new ClearGroup());
        this.createGroupButtonText = CREATE_GROUP;
      }
    }),
    takeWhile(() => this.componentActive);

    // Get the current group
    this.currentGroup$.subscribe(group => {
      if (group) { // Existing Group
        this.groupActionText = group.status == GroupStatus.Active ? DISABLE_GROUP : ENABLE_GROUP;
        this.groupForm.patchValue({
          id: group.id,
          name: group.name,
          description: group.description
        });
        this.group = group;
      } else {
      }
    }),
    takeWhile(() => this.componentActive);

    // if (!this.userHasPermission) {
    //   this.router.secondNavigateAction(['dashboard']);
    // }

    this.setActiveTab(PERMISSIONS_TAB);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  async save() {
    if (this.groupForm.valid) {
      if (this.groupForm.dirty) {
        const group: Group = { ...this.group, ...this.groupForm.value };

        if (this.groupId === 0) {
          console.log('AdminGroupEditComponent - save: ', group);
          await this.store.dispatch(new CreateGroup(group));
          this.currentGroupId$.subscribe(groupId => {
            if (groupId) {
              this.groupForm.reset();
              this.router.navigate([`/admin/groups/${groupId}/edit`]);
            }
          }),
          takeWhile(() => this.componentActive);
        } else {
          await this.store.dispatch(new UpdateGroup(group.id, group));
          this.groupForm.reset(this.groupForm.value);
        }
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  changeStatus() {
    // this.confirm(true);
    // this.confirmation$.subscribe((res: any)=>{
    //   if (res === true) {
        if (this.groupActionText === ENABLE_GROUP) {
          this.store.dispatch(new EnableGroup(this.groupId, this.group));
          // this.setNotification(this.group.name + ' was enable', messageType.success);
          this.groupActionText = DISABLE_GROUP;
        } else {
          this.store.dispatch(new DisableGroup(this.groupId, this.group));
          // this.setNotification(this.group.name + ' was disabled', messageType.error);
          this.groupActionText = ENABLE_GROUP;
        }
      // }
    // })
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
