import { AdminUserState } from './../admin-users-list/state/admin-users.state';
import { User } from './../../core/models/user';
import { Tab } from './../../core/models/tab';
import { Group } from './../../core/models/group';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Observable } from 'rxjs';
import { AdminGroupState } from '../admin-groups-list/state/admin-groups.state';
import { GetGroups } from '../admin-groups-list/state/admin.groups.action';
import { UserItem } from 'src/app/core/models/user.item';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent extends ListComponent implements OnInit {

  data: any[] = [];
  groups: Group[] = [];
  columns: GridColumn[] = [
    { type: "checkbox", headerText: "Select All", width: "100", field: "" },
    { type: "", headerText: "Groups", width: "", field: "name" }
  ];
  tabs: Tab[] = [
    { link: '', name: 'Groups'}
  ];
  userForm: FormGroup;
  user = new UserItem();

  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminUserState.getCurrentUser) currentUser$: Observable<Group[]>;

  constructor(protected store: Store, private fb: FormBuilder) {
    super(store);

    this.ShowLefNav(false);
  }

  ngOnInit() {
    this.store.dispatch(new GetGroups());
    this.groups$.subscribe(groups => (this.groups = groups));

    this.userForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3)] ],
      emailAddress: [''],
      description: ['']      
    });
  }

  save() {
    console.log(this.userForm);
    console.log('Saved: ' + JSON.stringify(this.userForm.value));
  }

  populateTestData(): void {
    this.userForm.patchValue({
      name: 'Jack',
      emailAddress: 'john@mai.com'
    });
  }

}
