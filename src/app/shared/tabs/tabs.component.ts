import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from 'src/app/core/models/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input()
  tabs: Tab[] = [];

  @Output()
  navigate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  performNavigation(link: string) {
    this.navigate.emit(link);
  }
}
