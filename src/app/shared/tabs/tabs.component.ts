import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import { Tab } from 'src/app/core/models/tab';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  public currentRoute: string;
  @Input()
  tabs: Tab[] = [];

  @Output()
  navigate = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.setActiveTab(this.router.url);
  }

  performNavigation(link: string) {
    this.setActiveTab(link);    
    this.navigate.emit(link);
  }

  setActiveTab(link: string) {
    let url = link.split('?')[0]; //get the current route without the query params
    let tab = this.tabs.find(x => x.link === url);
    if (tab) {
      this.tabs.map(x => x.isActive = false);
      tab.isActive = true;
    }
  }
}
