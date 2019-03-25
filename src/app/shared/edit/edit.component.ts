import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends BaseComponent implements OnInit {

  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
  }

}
