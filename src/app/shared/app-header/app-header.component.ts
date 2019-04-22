import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { AppState } from "../../state/app.state";
import { Observable } from "rxjs";
import { OktaAuthService } from '@okta/okta-angular';

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

  @Select(AppState.getDeviceWidth) deviceWidth$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute, public oktaAuth: OktaAuthService) {
    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });

    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {

    this.activatedRoute.url.subscribe((urlPath) => {
      console.log('AppHeaderComponent - ngOnInit: ', urlPath);
    })

    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  // ngDoCheck(): void {
  //   this.currentRoute= window.location.pathname;
  // }

  activateMenu(status: boolean) {
    status === true ? this.activated = true : this.activated = false;
  }

  login() {
    this.oktaAuth.loginRedirect('/profile');
  }

  logout() {
    // this.store.dispatch(new LogOut());

    //TODO - ngxs-ify
    this.oktaAuth.logout('/');

  }
}
