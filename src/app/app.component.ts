import { AppState } from './state/app.state';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Title } from "@angular/platform-browser";
import { DeviceWidth, AuthenticateUser, GetLoggedInUser } from "./state/app.actions";
import { Toast, ToastType } from './core/enum/toast';
import { closest } from '@syncfusion/ej2-base';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups/src/spinner/spinner';
import { User } from './core/models/entity/user';
import { AuthService } from './core/services/business/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private unsubscribe: Subject<void> = new Subject();
  public displayWidth: number;
  public browser = window.navigator.userAgent;
  isAuthenticated: boolean;
  showLeftNav: boolean = false;

  @Select(AppState.getSpinnerVisibility) showSpinner$: Observable<boolean>;
  @Select(AppState.getLeftNavVisibility) showLeftNav$: Observable<boolean>;
  @Select(AppState.getPageTitle) currentPageTitle$: Observable<string>;
  @Select(AppState.getToastMessage) toastMessage$: Observable<Toast>;
  @Select(AppState.getDeviceWidth) deviceWidth$: Observable<number>;
  @Select(AppState.getIsUserAuthenticated) isAuthenticated$: Observable<boolean>;

  buttons = [{ model: { content: "Ignore" }, click: this.btnToastClick.bind(this) }, { model: { content: "reply" } }];

  btnToastClick(e) {
    let toastEle = closest(e.target, '.e-toast');
    this.confirmBox.hide(toastEle);
  }

  constructor(public auth: AuthService, private title: Title, private store: Store) {

    this.currentPageTitle$.subscribe((res) => {
      res === 'OMV Client Portal' ? this.title.setTitle(res) : this.title.setTitle(res + ' - OMV Client Portal');
    });
    window.onresize = () => { store.dispatch(new DeviceWidth(window.innerWidth)) };

    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });
  }

  messages: string[] = [];
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser: User;

  @ViewChild('element') element;
  @ViewChild('confirmBox') confirmBox;
  position = { X: 'Right', Y: 'Top' };
  confirmBoxPosition = { X: 'Center', Y: 'Top' };

  ngOnInit() {
    this.showSpinner$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(showSpinner => {
        if (showSpinner) this.showSpinner(true);
        else this.showSpinner(false);
      });

    this.store.dispatch(new AuthenticateUser());

    // Get the authentication state for immediate use
    this.isAuthenticated$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async isAuthenticated => {
        if (isAuthenticated === false) {
          await this.auth.login();
        } else if (isAuthenticated === true) {
          this.store.dispatch(new GetLoggedInUser());
        }
      });

    this.toastMessage$.subscribe(toast => {
      if (!toast) return;
      switch (toast.type) {
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
    // window.onload = () => {
    //   const x = document.getElementById('loading');
    //   // for IE
    //   x.style.display = 'none';
    //   x.style.visibility = 'hidden';
    //   x.style.zIndex = '-20';
    //   console.log('PPPP', window.navigator.appVersion.indexOf("MSIE 1")==-1);
    //   // End for IE
    //   x.remove();
    // };
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
    if (show) {
      showSpinner(document.getElementById('spinnerContainer'));
    }
    else {
      hideSpinner(document.getElementById('spinnerContainer'));
    }
  }
}
