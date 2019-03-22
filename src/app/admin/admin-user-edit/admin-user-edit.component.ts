import { AdminUserState } from './../admin-users-list/state/admin-users.state';
import { User } from './../../core/models/user';
import { Tab } from './../../core/models/tab';
import { Group } from './../../core/models/group';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { Observable } from 'rxjs';
import { AdminGroupState } from '../admin-groups-list/state/admin-groups.state';
import { GetGroups } from '../admin-groups-list/state/admin.groups.action';
import { UserItem } from 'src/app/core/models/user.item';
import { UpdateUser } from '../admin-users-list/state/admin-users.actions';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css', './../../app.component.css']
})
export class AdminUserEditComponent extends ListComponent implements OnInit {
  
  userForm: FormGroup;
  user = new UserItem();
  tabs: Tab[] = [
    { link: '', name: 'Groups', isActive: true }
  ];

  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminUserState.getCurrentUser) currentUser$: Observable<UserItem>;

  constructor(protected store: Store, private fb: FormBuilder) {
    super(store);

    this.ShowLefNav(false);
  }

  profileForm: FormGroup;

  ngOnInit() {    
    // this.userForm = this.fb.group({
    //   id: [''],
    //   name: ['', [ Validators.required, Validators.minLength(3)] ],
    //   emailAddress: ['', [Validators.required, Validators.email] ],
    //   description: ['']
    // });

    // this.currentUser$.subscribe(user => {
    //   this.userForm = this.fb.group({
    //     id: user.id,
    //     name: [user.name, [ Validators.required, Validators.minLength(3)] ],
    //     emailAddress: [user.email, [Validators.required, Validators.email] ],
    //     description: [user.description],
        
    //   });
    // });
  }

  save() {
    console.log(this.userForm);

    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        const u: UserItem = { ...this.user, ...this.userForm.value };
        console.log('u ------------- ', u);

        // if (u.id === 0) {
        //   // this.store.dispatch(new CreateUser)
        // } else {
        //   this.store.dispatch(new UpdateUser(u.id, u));
        // }
        
      }
    }

  }

  populateTestData(): void {
    this.userForm.patchValue({
      name: 'Jack',
      emailAddress: 'john@mai.com'
    });
  }
}
