import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AppState } from "../../state/app.state";
import { Observable, Subject } from "rxjs";

import { AppStartupService } from 'src/app/core/services/appstartup.service';
import { AuthService } from 'src/app/core/services/business/auth.service';
import { AuthenticateUser, LogOut } from 'src/app/state/app.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  // public  currentRoute: string;
  private unsubscribe: Subject<void> = new Subject();
  value: string;
  public displayWidth: number;
  public activated: boolean;
  public isAuthenticated: boolean;

  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;
  @Select(AppState.getIsUserAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private appStartup: AppStartupService,private activatedRoute: ActivatedRoute, private auth: AuthService, private store: Store) {
    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });    
  }

  ngOnInit() {

    // Get the authentication state for immediate use
    //TODO - this needs to be reactive - ie NGXS so we know when state isauthenticated has changed
    //this way menu will change to logout
    
    
    
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  activateMenu(status: boolean) {
    status === true ? this.activated = true : this.activated = false;
  }

  login() {
    this.auth.login();
  }

  logout() {
    //TODO - ngxs-ify
    // this.auth.logout();
    this.store.dispatch(new LogOut());
  }
}
