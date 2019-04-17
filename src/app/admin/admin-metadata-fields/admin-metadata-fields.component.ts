import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { Observable } from 'rxjs';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField, UpdateMetaDataField } from '../state/admin-media/admin-media.action';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-admin-metadata-fields',
  templateUrl: './admin-metadata-fields.component.html',
  styleUrls: ['./admin-metadata-fields.component.css']
})
export class AdminMetadataFieldsComponent extends ListComponent implements OnInit, OnDestroy {
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'fieldName', width: '70' },
    { headerText: 'Type', field: 'fieldType', width: '80' },
    { headerText: 'List', width: '150', field: 'List' }];

  public data: { [key: string]: Object }[] = [{ id: 1, name: 'All Platforms' },
  { id: 2, name: 'All Register Types' }, { id: 3, name: 'All Systems' }];
  public listFields: Object = { text: 'name', value: 'id' };

  public fieldTypeData: { [key: string]: Object }[] = [{ id: 1, name: 'Text' },
  { id: 2, name: 'Dropdown' }];
  public typeListFields: Object = { text: 'name', value: 'id' };


  editLink = "<a class='remove-cls ' style='color: #0097A9 !important; text-decoration: underline !important;'>Remove</a>";
  removeLink = "<span class='e-icons e-pencil' style='color: #0097A9 !important'></span>";

  fieldName: string = '';
  fieldType: string = '';
  fieldId: number;
  metadataFieldForm: FormGroup;
  metadataField = new MetadataFields();

  componentActive: boolean;

  @ViewChild('listview') public dialogList: any;
  @ViewChild('fieldDialog') public fieldDialogList: DialogComponent;
  @Select(AdminMediaState.getMetaDataFields) metadataFields$: Observable<MetadataFields[]>;

  metadataFields: MetadataFields[];

  public saveDlgBtnClick: EmitType<object> = () => {
    this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.metadataFieldForm.controls, this.fieldType);

    if (this.metadataFieldForm.valid) {
      if (this.metadataFieldForm.dirty) {
        const metadataField: MetadataFields = { ...this.metadataField, ...this.metadataFieldForm.value };
        console.log('testing create user - ', metadataField);
        this.store.dispatch(new CreateMetaDataField(metadataField));
        this.fieldDialogList.hide();
      }
    }
  }
  isEdit: boolean;



  constructor(protected store: Store,
    private formBuilder: FormBuilder, ) {
    super(store);
    this.ShowLefNav(true);
    this.componentActive = true;
  }
  addList(action) {
    console.log('action', action.itemData);
  }
  ngOnInit() {
    this.metadataFieldForm = this.formBuilder.group({
      id: [''],
      fieldName: ['', [Validators.required]],
      fieldType: ['', [Validators.required]],
      List: ['', [Validators.required]],
    });
    this.store.dispatch(new GetMetaDataFields());
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  navigate(action) {
    console.log('action', action);
  }
  clearForm() {
    this.metadataFieldForm.reset({
      id: null,
      fieldName: '',
      fieldTypeId: null,
      ListId: null,
    });
  }
  add() {
    this.clearForm();
    this.fieldDialogList.show();
  }

  remove(data) {
    console.log(data);
    this.store.dispatch(new RemoveMetaDataFields(data.id));
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }

  save() {
    // this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.metadataFieldForm.controls, this.fieldType);

    if (this.metadataFieldForm.valid) {
      if (this.metadataFieldForm.dirty ) {
        const metadataField: MetadataFields = { ...this.metadataField, ...this.metadataFieldForm.value };
        if (!this.isEdit) {
          console.log('testing create user - ', metadataField);
          this.store.dispatch(new CreateMetaDataField(metadataField));
        }
        else {
          console.log('AdminMetadataFieldsComponent - edit', metadataField);
          this.store.dispatch(new UpdateMetaDataField(metadataField.id, metadataField));
        }
        this.fieldDialogList.hide();
      }
    }
  }

  closeDialog() {
    this.fieldDialogList.hide();
  }

  edit(action: MetadataFields) {
    this.isEdit = true;
    console.log(action);
    this.fieldDialogList.show();
    this.metadataFieldForm.setValue({
      id: action.id,
      fieldName: action.fieldName,
      fieldType: action.fieldTypeId,
      List: action.ListId,
    });
    console.log('AdminMetadataFieldsComponent - edit', this.metadataFieldForm);
  }
 
}
