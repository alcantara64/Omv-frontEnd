import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  public value: string;
  public selected: string;

  @Output()
  complete = new EventEmitter();

  public emitButtonAction = new Subject();
  
  constructor(private activatedRoute: ActivatedRoute) {
    this.value = this.activatedRoute.snapshot.paramMap.get('pageView');
   }

  ngOnInit() {
  }

  markAsSelected(listItem: string) {
    this.selected = listItem;
  }
}
