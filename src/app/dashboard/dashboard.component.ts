import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowLeftNav } from '../state/app.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) {
    this.store.dispatch(new ShowLeftNav(false));
   }

  ngOnInit() {
    
  }

}
