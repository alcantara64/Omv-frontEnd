import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/business/auth.service';
import { Store } from '@ngxs/store';
import { SetLoggedInUser, GetLoggedInUser } from '../state/app.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  result: string[];
  access_token: string[];
  token_type: string[];

  constructor(private authService: AuthService, private store: Store, private router: Router) { }

  ngOnInit() {
    this.authService.completeAuthentication().then(user => {
      if (user) {
        var hash = window.location.hash.substr(1);
        if (hash != '') {
            this.result = hash.split('&');
            console.log(this.result);
            this.access_token = this.result[0].split('=');
            localStorage["access_token"] = this.access_token[1];

            this.token_type = this.result[1].split('=');
            localStorage["token_type"] = this.token_type[1];
            
            this.store.dispatch(new GetLoggedInUser(1));
            var return_url = localStorage["return_url"];            

            this.router.navigate([return_url]);
        }
      }
    });
  }
}
