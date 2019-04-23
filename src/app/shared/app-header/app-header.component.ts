import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { AppState } from "../../state/app.state";
import { Observable } from "rxjs";

import { AppStartupService } from 'src/app/core/services/appstartup.service';
import { AuthService } from 'src/app/core/services/business/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  // public  currentRoute: string;
  value: string;
  public displayWidth: number;
  public activated: boolean;
  public isAuthenticated: boolean;

  @Select(AppState.setDeviceWidth) deviceWidth$: Observable<number>;

  constructor(private appStartup: AppStartupService,private activatedRoute: ActivatedRoute, private auth: AuthService) {
    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });

  }

  async ngOnInit() {

    this.activatedRoute.url.subscribe((urlPath) => {
      console.log('AppHeaderComponent - ngOnInit: ', urlPath);
    })

    // Get the authentication state for immediate use
    //TODO - this needs to be reactive - ie NGXS so we know when state isauthenticated has changed
    //this way menu will change to logout
    this.isAuthenticated = await this.auth.isAuthenticated();
  }

  

  activateMenu(status: boolean) {
    status === true ? this.activated = true : this.activated = false;
  }

  login() {
    this.auth.login();
  }

  logout() {
    // this.store.dispatch(new LogOut());

    //TODO - ngxs-ify
    this.auth.logout();

  }
}
