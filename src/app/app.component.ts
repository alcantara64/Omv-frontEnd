import { AppState } from './state/app.state';
import { Component } from '@angular/core';
import { AuthService, User } from './core/services/data/appsettings/auth.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap} from "@angular/router";
import * as automapper from 'automapper-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLeftNav: boolean = false;
  // currentPageTitle: string;
  @Select(AppState.getLeftNavVisibility) showLeftNav$: Observable<boolean>;
  @Select(AppState.getPageTitle) currentPageTitle$: Observable<string>;
  private currentPageTitle: string;

  constructor(public authn: AuthService, private title: Title, private activatedRoute: ActivatedRoute) {
    this.currentPageTitle$.subscribe( (res) => {
      res === 'OMV Client Portal' ? this.title.setTitle(res) : this.title.setTitle(res + ' - OMV Client Portal');
    })
  }

  messages: string[] = [];
  get currentUserJson() : string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser : User;

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
