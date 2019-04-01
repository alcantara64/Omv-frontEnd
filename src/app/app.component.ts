import { AppState } from './state/app.state';
import { Component, ViewChild } from '@angular/core';
import { AuthService, User } from './core/services/data/appsettings/auth.service';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ClearNotification, Confirmation, messageType, ShowConfirmationBox} from "./state/app.actions";
import { ToastPosition } from '@syncfusion/ej2-notifications';
import { Toast, ToastType } from './core/enum/toast';
import { closest } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLeftNav: boolean = false;
  
  @Select(AppState.getLeftNavVisibility) showLeftNav$: Observable<boolean>;
  @Select(AppState.getPageTitle) currentPageTitle$: Observable<string>;
  @Select(AppState.getToastMessage) toastMessage$: Observable<Toast>;

  buttons = [{ model: { content: "Ignore" }, click: this.btnToastClick.bind(this)}, {model: { content: "reply" }}];

  btnToastClick(e) {
    let toastEle = closest(e.target, '.e-toast');
    this.confirmBox.hide(toastEle);
  }

  constructor(public authn: AuthService, private title: Title, private activatedRoute: ActivatedRoute, private store:Store) {
    this.currentPageTitle$.subscribe( (res) => {
      res === 'OMV Client Portal' ? this.title.setTitle(res) : this.title.setTitle(res + ' - OMV Client Portal');
    });
  }

  messages: string[] = [];
  get currentUserJson() : string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser : User;
  
  @ViewChild('element') element;
  @ViewChild('confirmBox') confirmBox;
  position = { X: 'Right', Y: 'Top' };
  confirmBoxPosition = { X: 'Center', Y: 'Top' };

  ngOnInit(): void {

    // this.authn.getUser().then(user => {
    //   this.currentUser = user;

    //   if (user){
    //     this.addMessage("User Logged In");
    //   }
    //   else {
    //     this.onLogin();
    //     this.addMessage("User Not Logged In");
    //   }
    // }).catch(err => this.addError(err));
    this.toastMessage$.subscribe(toast => {
      if (!toast) return;
      switch(toast.type) {
        case ToastType.success:
          var _toast = { title: 'Success!', content: toast.message, cssClass: 'e-toast-success' };
          this.element.show(_toast);
        break;
      }
    });
  }
  
  onCreate() {
  
  }

  clearMessages() {
    while (this.messages.length) {
      this.messages.pop();
    }
  }
  addMessage(msg: string) {
    this.messages.push(msg);
  }
  addError(msg: string | any) {
    this.messages.push("Error: " + msg && msg.message);
  }

  public onLogin() {
    this.clearMessages();
    this.authn.login().catch(err => {
      this.addError(err);
    });
  }

  public onCallAPI() {
    this.clearMessages();
    // this.apiService.callApi().then(result => {
    //   this.addMessage("API Result: " + JSON.stringify(result));
    // }, err => this.addError(err));
  }

  public onRenewToken() {
    this.clearMessages();
    this.authn.renewToken()
      .then(user=>{
        this.currentUser = user;
        this.addMessage("Silent Renew Success");
      })
      .catch(err => this.addError(err));
  }

  public onLogout() {
    this.clearMessages();
    this.authn.logout().catch(err => this.addError(err));
  }
}
