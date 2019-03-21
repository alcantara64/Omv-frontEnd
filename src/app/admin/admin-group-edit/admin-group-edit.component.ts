import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})
export class AdminGroupEditComponent implements OnInit {
  public headerText: Object = [{ text: 'Permissions' }, { text: 'Members' }, { text: 'Media Access' }];

  constructor(private store: Store) {    
    this.store.dispatch(new ShowLeftNav(false));
  }
 
  ngOnInit() {
  }

}
