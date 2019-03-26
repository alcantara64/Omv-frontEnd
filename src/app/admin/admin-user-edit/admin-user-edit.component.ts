import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { AdminUserState } from '../state/admin-users/admin-users.state';
import { User } from './../../core/models/user';
import { Tab } from './../../core/models/tab';
import { Group } from './../../core/models/group';
import { ListComponent } from 'src/app/shared/list/list.component';
import { AdminGroupState } from '../state/admin-groups/admin-groups.state';
import { UpdateUser, CreateUser, GetUser, DisableUser, EnableUser } from '../state/admin-users/admin-users.actions';
import { UserStatus } from 'src/app/core/enum/user-status.enum';

const CREATE_USER = 'Create User';
const UPDATE_USER = 'Update User';
const DISABLE_USER = 'Disable User';
const ENABLE_USER = 'Enable User';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css', './../../app.component.css']
})
export class AdminUserEditComponent extends ListComponent implements OnInit, OnDestroy {
  
  componentActive = true;
  userId: number;
  userForm: FormGroup;
  user = new User();
  tabs: Tab[] = [
    { link: '', name: 'Groups', isActive: true }
  ];
  createUserButtonText: string;
  userActionText: string;
  errorMessage: string;

  @Select(AdminGroupState.getGroups) groups$: Observable<Group[]>;
  @Select(AdminUserState.getCurrentUser) currentUser$: Observable<User>;
  @Select(AdminUserState.getCurrentUserId) currentUserId$: Observable<number>;

  constructor(protected store: Store, 
              private fb: FormBuilder, 
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
    this.PageTitle('Admin User Edit')
  }

  ngOnInit() {

    // Initialize the userForm
    this.userForm = this.fb.group({
      id: [''],
      name: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      description: [ '' ]
    });

    // Get the id in the browser url and reach out for the User
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.store.dispatch(new GetUser(this.userId));
      this.createUserButtonText = this.userId ? UPDATE_USER : CREATE_USER;
    }), 
    takeWhile(() => this.componentActive);

    // Get the currentUser
    this.currentUser$.subscribe(user => {      
      if (user) { // Existing User
        this.userActionText = user.status == UserStatus.Active ? DISABLE_USER : ENABLE_USER;
        this.userForm = this.fb.group({
          id: user.id,
          name: [ user.name, [ Validators.required ] ],
          email: [ user.email, [ Validators.required, Validators.email ] ],
          description: [ user.description ]
        });
        this.user = user;
      }
    }),
    takeWhile(() => this.componentActive);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  async save() {
    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        const updatedUser: User = { ...this.user, ...this.userForm.value };

        if (this.userId === 0) { // Create User
          await this.store.dispatch(new CreateUser(updatedUser));
          this.currentUserId$.subscribe(userId => {
            if (userId) {
              this.userForm.reset();
              this.router.navigate([`/admin/users/${userId}/edit`])
            }
          }),
          takeWhile(() => this.componentActive);
        } else { // Update User
          await this.store.dispatch(new UpdateUser(updatedUser.id, updatedUser));
          this.userForm.reset(this.userForm.value);          
        }        
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  changeStatus() {
    if (this.userActionText === ENABLE_USER) {
      this.store.dispatch(new EnableUser(this.userId, this.user));
      this.userActionText = DISABLE_USER;
    } else {
      this.store.dispatch(new DisableUser(this.userId, this.user));
      this.userActionText = ENABLE_USER;
    }
  }
}
