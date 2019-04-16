import { Component, OnInit } from "@angular/core";
import { permission, Permission } from "src/app/core/enum/permission";
import {Select, Store} from "@ngxs/store";
import {
  Confirmation,
  messageType,
  SetNotification,
  SetPageTitle,
  ShowConfirmationBox,
  ShowLeftNav,
  GetUserPermissions
} from "src/app/state/app.actions";
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups/src/spinner/spinner';


export class BaseComponent implements OnInit {
  public displayWidth: number;
  private _permission: string;
  public userHasPermission: boolean;
  public currentUserId: number;
  public permission: string;

  @Select(AppState.confirmation) confirmation$: Observable<string>;
  @Select(AppState.getUserPermissions) userPermissions$: Observable<Permission[]>;
  @Select(AppState.getCurrentUserId) currentUserId$: Observable<number>;
  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;

  constructor(protected store: Store) {
    console.log("BaseComponent - constructor", this._permission);

    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });

    this.currentUserId$.subscribe(userId => {
      this.currentUserId = userId;
      if (this.currentUserId) {
        this.store.dispatch(new GetUserPermissions(userId));
      }
    });

    this.userPermissions$.subscribe(permissions => {
      // console.log('BaseComponent - ngOnInit: _permission', this._permission);
      if (this._permission) {
        console.log('BaseComponent - ngOnInit: _permission', this._permission);
        var permissionNames = permissions.map(p => p.name);
        this.userHasPermission = permissionNames.includes(this._permission);

        if (!this.userHasPermission) {
          console.log('BaseComponent - ngOnInit: userHasPermission', this.userHasPermission);
        }
      }
      this.Permission = "";
    });
  }

  ngOnInit() {
    console.log("BaseComponent - ngOnInit");

    // if (this.currentUserId) {
    //   this.store.dispatch(new GetUserPermissions(this.currentUserId));
    // }
  }

  ngAfterViewInit() {
  }

  public ShowSpinner(show: boolean) {
    createSpinner({
      // Specify the target for the spinner to show
      target: document.getElementById('spinnerContainer')
    });
    if (show) {
      showSpinner(document.getElementById('spinnerContainer'));
    } else {
      hideSpinner(document.getElementById('spinnerContainer'));
    }
  }

  get Permission(): string {
    return this._permission;
  }
  set Permission(value: string) {
    this._permission = value;
  }

  protected ShowLefNav(show: boolean) {
    this.store.dispatch(new ShowLeftNav(show));
  }

  protected PageTitle(pageTitle: string) {
    this.store.dispatch(new SetPageTitle(pageTitle));
  }

  protected setNotification(message: string, messageType?: messageType) {
    this.store.dispatch(new SetNotification(message, messageType));
  }

  protected confirm(show: boolean) {
    this.store.dispatch(new ShowConfirmationBox(show));
  }

  protected isConfirmed() {
    let confirmed: boolean;
    this.confirmation$.subscribe( (res) => {
      res === 'true' ? confirmed = true : confirmed = false;
    });

    return confirmed;
  }
}
