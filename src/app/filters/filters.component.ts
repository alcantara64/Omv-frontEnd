import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DynamicFormComponent } from '../shared/dynamic-components/components/dynamic-form.component';
import { Select, Store } from '@ngxs/store';
import { MediaState } from '../media/state/media/media.state';
import { Observable, Subject } from 'rxjs';
import { FieldConfiguration } from '../shared/dynamic-components/field-setting';
import { takeUntil } from 'rxjs/operators';
import { GetFilterFields } from '../media/state/media/media.action';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  @Select(MediaState.getFilterFields) filterFields$: Observable<any[]>;

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  fields: FieldConfiguration[] = [];

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
    throw new Error("Method not implemented.");
  }

  apply() {

  }
}
