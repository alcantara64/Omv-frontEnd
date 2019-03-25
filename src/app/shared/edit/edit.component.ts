import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', '../../app.component.css']
})
export class EditComponent extends BaseComponent implements OnInit {

  @Input() firstButtonText: string;
  @Input() isfirstButtonDisabled: boolean;

  @Input() secondButtonText: string;
  @Input() isSecondButtonVisible: boolean;

  @Output() firstButtonEvent = new EventEmitter<any>();

  @Output() secondButtonEvent = new EventEmitter<any>();

  constructor(protected store: Store) {
    super(store);
  }

  ngOnInit() {
  }

  performSecondEvent() {
    this.secondButtonEvent.emit();
  }
}
