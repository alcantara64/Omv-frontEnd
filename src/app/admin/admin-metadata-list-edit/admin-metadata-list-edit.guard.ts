import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { AdminMetadataListEditComponent } from './admin-metadata-list-edit.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMetadataListEditGuard implements CanDeactivate<AdminMetadataListEditComponent> {

  canDeactivate (component: AdminMetadataListEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.metadataListForm.dirty) {
      const metadataListName = component.metadataListForm.get('name').value || 'New List';
      return confirm (`Navigate away and lose all changes to ${metadataListName}`);
    }
    return true;
  }
}