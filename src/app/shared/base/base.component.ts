import { Component, OnInit } from "@angular/core";
import { permission } from "src/app/core/enum/permission";
import { Store } from "@ngxs/store";
import {SetPageTitle, ShowLeftNav} from "src/app/state/app.actions";
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

export class BaseComponent implements OnInit {
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
}
