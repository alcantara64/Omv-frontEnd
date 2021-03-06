import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {AdminUserState} from '../state/admin-users/admin-users.state';
import {User} from '../../core/models/entity/user';
import {Tab} from './../../core/models/tab';
import {ListComponent} from 'src/app/shared/list/list.component';
import {
  InitializeUser,
  CreateUser,
  DisableUser,
  EnableUser,
  GetUser,
  UpdateUser
} from '../state/admin-users/admin-users.actions';
import {UserStatus} from 'src/app/core/enum/user-status.enum';

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

  @Select(AdminUserState.getCurrentUser) currentUser$: Observable<User>;
  @Select(AdminUserState.getCurrentUserId) currentUserId$: Observable<number>;

  constructor(protected store: Store,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
    this.PageTitle('Admin User Edit')
  }

  ngOnInit() {
    // Initialize the userForm
    this.userForm = this.formBuilder.group({
      userId: [''],
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ],
      userName: [ '', [ Validators.required ] ],
      emailAddress: [ '', [ Validators.required, Validators.email ] ]
    });

    // Get the id in the browser url and reach out for the User
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      if (this.userId) {
        this.store.dispatch(new GetUser(this.userId));
        this.createUserButtonText = UPDATE_USER;
      } else {
        this.store.dispatch(new InitializeUser());
        this.createUserButtonText = CREATE_USER;
      }
    }),
    takeWhile(() => this.componentActive);

    // Get the currentUser
    this.currentUser$.subscribe(user => {
      if (user) { // Existing User
        this.userActionText = user.status == UserStatus.Active ? DISABLE_USER : ENABLE_USER;
        this.userForm.setValue({
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          emailAddress: user.emailAddress
        });
        this.user = user;
      } else {
        this.userForm.reset();
      }
    }),
    takeWhile(() => this.componentActive);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        const user: User = { ...this.user, ...this.userForm.value };

        if (this.userId === 0) { // Create User
          console.log('testing create user - ', user);
          this.store.dispatch(new CreateUser(user));
          this.currentUserId$.subscribe(userId => {
            if (userId) {
              this.userForm.reset();
              this.router.navigate([`/admin/users/${userId}/edit`]);
            }
          }),
          takeWhile(() => this.componentActive);
        } else { // Update User
          console.log('testing update user - ', user);
          this.store.dispatch(new UpdateUser(user.userId, user));
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
