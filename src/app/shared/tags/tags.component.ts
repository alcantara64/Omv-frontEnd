import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/core/models/entity/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() tag: Tag;
  @Output() removeTag = new EventEmitter<Tag>();

  constructor() { }

  ngOnInit() {
  }

  removeTagEvent(tag: Tag) {
    this.removeTag.emit(tag);
  }
}
