import { LogOut } from './../../state/app.actions';
import {Component, DoCheck, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  // public  currentRoute: string;
  value: string;
  public displayWidth: number;
  public activated: boolean;

  @Select(AppState.getDeviceWidth) deviceWidth$: Observable<number>;

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private router:Router) {
    this.deviceWidth$.subscribe(width => {
      this.displayWidth = width;
    });
  }

  ngOnInit() {

    this.activatedRoute.url.subscribe((urlPath) => {
      console.log('AppHeaderComponent - ngOnInit: ', urlPath);
  })
  }

  // ngDoCheck(): void {
  //   this.currentRoute= window.location.pathname;
  // }

  activateMenu(status: boolean) {
    status === true ? this.activated = true : this.activated = false;
  }

  logout() {
    // this.store.dispatch(new LogOut());
  }
}
