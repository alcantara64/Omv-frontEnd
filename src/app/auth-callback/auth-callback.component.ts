import { Component } from '@angular/core';
import { AuthService } from '../core/services/business/auth.service';
import { Store } from '@ngxs/store';

@Component({template: ''})
export class AuthCallbackComponent{
  
  constructor(private auth: AuthService, private store: Store) {
    // Handles the response from Okta and parses tokens
    auth.handleAuthentication();
  }
}
