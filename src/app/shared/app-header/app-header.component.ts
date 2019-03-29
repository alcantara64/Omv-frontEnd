import { LogOut } from './../../state/app.actions';
import {Component, DoCheck, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, DoCheck {
  public  currentRoute: string;
  value: string;
  constructor(private store: Store, private activatedRoute: ActivatedRoute, private router:Router) {
   
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.currentRoute= window.location.pathname;
  }

  logout() {
    this.store.dispatch(new LogOut());
  }
}
