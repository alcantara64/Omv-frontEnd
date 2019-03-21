import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  
  constructor(private store: Store) { 
    this.store.dispatch(new ShowLeftNav(true));
  }

  ngOnInit() {
  }

}
