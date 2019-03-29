import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowLeftNav } from 'src/app/state/app.actions';
import {BaseComponent} from "../../shared/base/base.component";
import { Router } from '@angular/router';
import { permission } from 'src/app/core/enum/permission';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

  
  constructor(public store: Store, protected router: Router) {
    super(store, router);
    this.store.dispatch(new ShowLeftNav(true));
    this.PageTitle('Admin Dashboard');
    this.Permission = permission.VIEW_ADMIN_DASHBOARD;
    this.currentUserId = 10;
  }

  ngOnInit() {
    
    // if (!this.userHasPermission) {
    //   this.router.navigate(['dashboard']);
    // }
  }

}
