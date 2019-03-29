import { Component, OnInit } from "@angular/core";
import { permission, Permission } from "src/app/core/enum/permission";
import { Store, Select } from "@ngxs/store";
import {SetPageTitle, ShowLeftNav, GetUserPermissions} from "src/app/state/app.actions";
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export class BaseComponent implements OnInit {
  private _permission: string;
  userHasPermission: boolean;

  currentUserId: number;

  permission: string;



  @Select(AppState.getUserPermissions) userPermissions$: Observable<Permission[]>;
  @Select(AppState.getCurrentUserId) currentUserId$: Observable<number>;

  constructor(protected store: Store, protected router: Router) {
    console.log("BaseComponent - constructor", this._permission);

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
    });
  }

  ngOnInit() {
    console.log("BaseComponent - ngOnInit");

    // if (this.currentUserId) {
    //   this.store.dispatch(new GetUserPermissions(this.currentUserId));
    // }
  }

  ngAfterViewInit() {
    //createSpinner() method is used to create spinner
    // createSpinner({
    //   // Specify the target for the spinner to show
    //   target: document.getElementById('spinnerContainer')
    // });
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
}
