import { Component } from '@angular/core';
import { AuthService } from '../core/services/business/auth.service';

@Component({template: ''})
export class AuthCallbackComponent{
  
  constructor(private auth: AuthService) {
    // Handles the response from Okta and parses tokens
    auth.handleAuthentication();
  }
}
