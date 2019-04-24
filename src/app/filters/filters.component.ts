import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DynamicFormComponent } from '../shared/dynamic-components/components/dynamic-form.component';
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../media/state/media/media.state';
import { Observable, Subject } from 'rxjs';
import { FieldConfiguration } from '../shared/dynamic-components/field-setting';
import { takeUntil } from 'rxjs/operators';
import { GetFilterFields, AddFilterTag, RemoveFilterTag, ClearFilterTags } from '../media/state/media/media.action';
import { Tag } from '../core/models/entity/tag';

const ARROW_UP = '../../assets/images/icon-arrow-up.svg';
const ARROW_DOWN = '../../assets/images/icon-arrow-down.svg';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  @Select(MediaState.getFilterFields) filterFields$: Observable<FieldConfiguration[]>;
  @Select(MediaState.getFilterTags) filterTags$: Observable<Tag[]>;

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  fields: FieldConfiguration[] = [];
  showFilters: boolean;
  toggleDirectionIcon = ARROW_DOWN;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetFilterFields());
    this.filterFields$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(fields => {
        this.fields = fields;
        console.log('FiltersComponent ngOnInit ', fields);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  dropdownChange(data: any) {    
    this.store.dispatch(new AddFilterTag(data.fieldName, data.description));    
    this.fields.map(x => {
      if (x.name.toLowerCase() === data.fieldName.toLowerCase()) {
        x.options.map(option => {
          if (option.description.toLowerCase() === data.description.toLowerCase()) {
            option.isSelected = true;
          }
        });
      }
    });
  }

  removeTag (tag: Tag) {
    this.store.dispatch(new RemoveFilterTag(tag.name, tag.value));    
    this.fields.map(x => {
      if (x.name.toLowerCase() === tag.name.toLowerCase()) {
        x.options.map(option => {
          if (option.description.toLowerCase() === tag.value.toLowerCase()) {
            option.isSelected = false;
          }
        });
      }
    });
  }

  clearFilters() {
    this.store.dispatch(new ClearFilterTags());
    this.fields.map(field => {      
      field.options.map(option => {
        option.isSelected = false;
      });
    });
  }

  apply() {

  }

  toggle() {
    this.showFilters = !this.showFilters;
    this.switchToggleArrowIcons(this.showFilters);
  }

  switchToggleArrowIcons (isOpen: boolean) {
    if (isOpen) {
      this.toggleDirectionIcon = ARROW_UP;
    } else {
      this.toggleDirectionIcon = ARROW_DOWN;
    }
  }
}
