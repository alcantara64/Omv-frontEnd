import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { Store, Select } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import { DynamicFormComponent } from 'src/app/shared/dynamic-components/components/dynamic-form.component';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminUserState } from '../state/admin-users/admin-users.state';
import { GetUploadRequest } from '../state/admin-media/admin-media.action';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UploadRequest } from 'src/app/core/models/entity/upload-request';

@Component({
  selector: 'app-admin-media-upload-details',
  templateUrl: './admin-media-upload-details.component.html',
  styleUrls: ['./admin-media-upload-details.component.css']
})
export class AdminMediaUploadDetailsComponent extends BaseComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  fields: UploadRequest;

  @Select(AdminMediaState.getCurrentUploadRequestFields) currentUploadRequestFields$: Observable<any>;
  id: number;

  constructor(protected store: Store, private activatedRoute: ActivatedRoute) {
    super(store);
    this.ShowLefNav(false);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.store.dispatch(new GetUploadRequest(this.id));
      this.currentUploadRequestFields$
        // .pipe(takeUntil(this.unsubscribe))
        .subscribe(fields => {
          console.log(this.fields);
          if(fields){
            this.fields = fields;
          }
        }
        );
    });

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
