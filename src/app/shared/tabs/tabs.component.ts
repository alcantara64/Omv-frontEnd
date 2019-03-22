import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import { Tab } from 'src/app/core/models/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, DoCheck {

  public currentRoute: string;
  @Input()
  tabs: Tab[] = [];

  @Output()
  navigate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.currentRoute = window.location.pathname;
  }

  performNavigation(link: string) {
    this.navigate.emit(link);
  }
}
