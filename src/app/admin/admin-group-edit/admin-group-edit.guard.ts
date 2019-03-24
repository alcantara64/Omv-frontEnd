import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { AdminGroupEditComponent } from './admin-group-edit.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupEditGuard implements CanDeactivate<AdminGroupEditComponent> {
  canDeactivate (component: AdminGroupEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.groupForm.dirty) {
      const groupName = component.groupForm.get('name').value || 'New Group';
      return confirm (`Navigate away and lose all changes to ${groupName}`);
    }
    return true;
  }
}