import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';
import {BaseComponent} from "../../shared/base/base.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

  
  constructor(public store: Store) {
    super(store);
    this.store.dispatch(new ShowLeftNav(true));
    this.PageTitle('Admin Dashboard');
  }

  ngOnInit() {
  }

}
