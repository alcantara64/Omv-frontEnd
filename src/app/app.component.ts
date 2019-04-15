import { AppState } from './state/app.state';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { AuthService, User } from './core/services/data/appsettings/auth.service';
import {Select, Store} from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import {Title} from "@angular/platform-browser";
import {
  DeviceWidth} from "./state/app.actions";
import { Toast, ToastType } from './core/enum/toast';
import { closest } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  private unsubscribe: Subject<void> = new Subject();
  public displayWidth: number;
  showLeftNav: boolean = false;
  
  @Select(AppState.getSpinnerVisibility) showSpinner$: Observable<boolean>;
  @Select(AppState.getLeftNavVisibility) showLeftNav$: Observable<boolean>;
  @Select(AppState.getPageTitle) currentPageTitle$: Observable<string>;
  @Select(AppState.getToastMessage) toastMessage$: Observable<Toast>;
  @Select(AppState.getDeviceWidth) deviceWidth$: Observable<number>;

  buttons = [{ model: { content: "Ignore" }, click: this.btnToastClick.bind(this)}, {model: { content: "reply" }}];

  btnToastClick(e) {
    let toastEle = closest(e.target, '.e-toast');
    this.confirmBox.hide(toastEle);
  }

  constructor(public authn: AuthService, private title: Title, store:Store) {
    this.currentPageTitle$.subscribe( (res) => {
      res === 'OMV Client Portal' ? this.title.setTitle(res) : this.title.setTitle(res + ' - OMV Client Portal');
    });
    window.onresize = () => {store.dispatch(new DeviceWidth(window.innerWidth))};
    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
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
    this.showSpinner$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(showSpinner => {
        if (showSpinner) this.showSpinner(true);
        else this.showSpinner(false);
      });
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
        case ToastType.error:
          var _toast = { title: 'Error!', content: toast.message, cssClass: 'e-toast-danger' };
          this.element.show(_toast);
        break;
      }
    });
  }

  ngAfterViewInit(): void {
    window.onload = () => {
      const x = document.getElementById('loading');
      // for IE
      x.style.display = 'none';
      x.style.visibility = 'hidden';
      x.style.zIndex = '-20';
      // End for IE
      x.remove();
    };
  }

  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  
  showSpinner(show: boolean) {
    createSpinner({
      // Specify the target for the spinner to show
      target: document.getElementById('spinnerContainer')
    });
    if (show) showSpinner(document.getElementById('spinnerContainer'));
    else hideSpinner(document.getElementById('spinnerContainer'));
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
