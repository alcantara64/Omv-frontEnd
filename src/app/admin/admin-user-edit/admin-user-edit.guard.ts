import { Injectable } from "@angular/core";
import { AdminUserEditComponent } from './admin-user-edit.component';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserEditGuard implements CanDeactivate<AdminUserEditComponent> {
  canDeactivate(component: AdminUserEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.userForm.dirty) {
      const userName = component.userForm.get('name').value || 'New User';
      return confirm (`Navigate away and lose all changes to ${userName}`);
    }
    return true;
  }
}