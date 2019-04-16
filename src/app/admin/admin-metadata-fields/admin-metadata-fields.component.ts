import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { Observable } from 'rxjs';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField } from '../state/admin-media/admin-media.action';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-admin-metadata-fields',
  templateUrl: './admin-metadata-fields.component.html',
  styleUrls: ['./admin-metadata-fields.component.css']
})
export class AdminMetadataFieldsComponent extends ListComponent implements OnInit {
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'fieldName', width: '70' },
    { headerText: 'Type', field: 'fieldType', width: '80' },
    { headerText: 'List', width: '150', field: 'List' },
    { headerText: ' ', type: 'checkbox', width: '50', field: 'isUnique' }];
  public data: { [key: string]: Object }[] = [{ id: 1, name: 'All Platforms' },
  { id: 2, name: 'All Register Types' }, { id: 3, name: 'All Systems' }];
  public listFields: Object = { text: 'name', value: 'id' };
  public placeholder: string = 'Select a List';
  editLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important;'>Remove</a>";
  removeLink = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";
  fieldName: string = '';
  fieldType: string  = '';
  fieldId: number;
  metadataFieldForm: FormGroup;
  metadataField = new MetadataFields();

  @ViewChild('listview') public dialogList: any;
  @ViewChild('fieldDialog') public fieldDialogList: DialogComponent;
  @Select(AdminMediaState.getMetaDataFields) metadataFields$: Observable<MetadataFields[]>;

  metadataFields: MetadataFields[];

  public saveDlgBtnClick: EmitType<object> = () => {
    this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.fieldName, this.fieldType);

    if (this.metadataFieldForm.valid) {
      if (this.metadataFieldForm.dirty) {
        const metadataField: MetadataFields = { ...this.metadataField, ...this.metadataFieldForm.value };
        console.log('testing create user - ', metadataField);
        this.store.dispatch(new CreateMetaDataField(metadataField));
      }
    }
  }

    //     if (this.fieldId === 0) { // Create User
    //       console.log('testing create user - ', metadataField);
    //       // this.store.dispatch(new CreateUser(user));
    //       // this.currentUserId$.subscribe(userId => {
    //       //   if (userId) {
    //       //     this.userForm.reset();
    //       //     this.router.navigate([`/admin/users/${userId}/edit`]);
    //       //   }
    //       //}),
    //       takeWhile(() => this.componentActive);
    //     } else { // Update User
    //       // console.log('testing update user - ', user);
    //       // this.store.dispatch(new UpdateUser(user.userId, user));
    //       // this.userForm.reset(this.userForm.value);
    //     }
    //   }
    // } else {
    //   // this.errorMessage = "Please correct the validation errors.";
    // }
    // // var permissionData = this.fieldDialogList.getSelectedItems().data;
    // // let permissionidArray: any[] = [];

    // // permissionData.forEach(permission => {
    // //   permissionidArray.push(permission.id);
    // // });

    // // this.selectedGroups.forEach(user => {
    // //   this.store.dispatch(new AssignToPermission(user.id, permissionidArray));
    // // });


    // // this.permissionDialog.hide();
    // // this.store.dispatch(new GetPermissions());
  // }
  componentActive: boolean =false;


  constructor(protected store: Store,
    private formBuilder: FormBuilder,) {
    super(store);
    this.ShowLefNav(true);
    this.componentActive = true;
  }
  addList(action){
    console.log('action', action.itemData);
  }
  ngOnInit() {
    this.metadataFieldForm = this.formBuilder.group({
      id: [''],
      fieldName: [ '', [ Validators.required ] ],
      fieldType: [ '', [ Validators.required ] ],
      // List: [ '', [ Validators.required ] ],
      // emailAddress: [ '', [ Validators.required, Validators.email ] ]
    });
    this.store.dispatch(new GetMetaDataFields());
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }
  navigate(action) {
    console.log('action', action);
  }
  add() {
    this.fieldDialogList.show();
  }

  remove(data) {
    console.log(data);
    this.store.dispatch(new RemoveMetaDataFields(data.id));
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }
  addDlgButtons: Object[] = [{ click: this.saveDlgBtnClick.bind(this), buttonModel: { content: 'Save', isPrimary: true } }];


}
