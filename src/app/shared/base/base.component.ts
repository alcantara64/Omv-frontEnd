import { Component, OnInit } from "@angular/core";
import { permission } from "src/app/core/enum/permission";
import {Select, Store} from "@ngxs/store";
import {
  Confirmation,
  messageType,
  SetNotification,
  SetPageTitle,
  ShowConfirmationBox,
  ShowLeftNav
} from "src/app/state/app.actions";
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";


export class BaseComponent implements OnInit {
  @Select(AppState.confirmation) confirmation$: Observable<string>;

  private _permission: string;

    constructor(protected store: Store) {
      console.log("Base - constructor");
    }

  ngOnInit() {}

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
    })
    return confirmed;
  }
}
