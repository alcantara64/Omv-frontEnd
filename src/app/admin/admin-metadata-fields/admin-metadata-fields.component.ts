import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ListComponent } from 'src/app/shared/list/list.component';
import { Store, Select } from '@ngxs/store';
import { GridColumn } from 'src/app/core/models/grid.column';
import { AdminMediaState } from '../state/admin-media/admin-media.state';
import { Observable } from 'rxjs';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField, UpdateMetaDataField, GetMetadataListById, GetFieldTypes, GetMetaDataLists } from '../state/admin-media/admin-media.action';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataFieldType } from 'src/app/core/models/entity/metadata-fieldtype';

@Component({
  selector: 'app-admin-metadata-fields',
  templateUrl: './admin-metadata-fields.component.html',
  styleUrls: ['./admin-metadata-fields.component.css']
})
export class AdminMetadataFieldsComponent extends ListComponent implements OnInit, OnDestroy {
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'fieldName', width: '70' },
    { headerText: 'Type', field: 'fieldTypeId', width: '80' },
    { headerText: 'List', width: '150', field: 'metadataListName' }];

  public listFields: Object = { text: 'itemDescription', value: 'itemValue' };
  public createListFields: Object = { text: 'fieldName', value: 'id' };

  public fieldTypeData: MetadataFieldType[];
  public typeListFields: Object = { text: 'type', value: 'fieldTypeId' };


  isFieldTypeList: boolean = false;

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
  @Select(AdminMediaState.getMetadataListById) metadataList$: Observable<MetadataList[]>;
  @Select(AdminMediaState.getMetadataFieldTypes) fieldTypeList$: Observable<MetadataFieldType[]>;
  @Select(AdminMediaState.getMetaDataLists) metadataLists$: Observable<MetadataList[]>;
  metadataFields: MetadataFields[];
  data: MetadataList[];
  isEdit: boolean;
  showListDropdown: boolean = false;
  showAllListDropdown: boolean;
  allMetadataList: MetadataList[];

  constructor(protected store: Store,
    private formBuilder: FormBuilder, ) {
    super(store);
    this.ShowLefNav(true);
    this.componentActive = true;
  }
  ngOnInit() {
    this.metadataFieldForm = this.formBuilder.group({
      metadataFieldId: [null],
      fieldName: ['', [Validators.required]],
      fieldTypeId: [null, [Validators.required]],
      metadataListId: [null, [Validators.required]],
      isRequired: [false, [Validators.required]],
      isDeleted: [false, [Validators.required]],
      relatedField: ['', [Validators.required]],
      sort: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
    this.store.dispatch(new GetMetaDataFields());
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
    this.store.dispatch(new GetFieldTypes())
    this.fieldTypeList$.subscribe(fieldTypes => {
      this.fieldTypeData = fieldTypes;
    });
    this.store.dispatch(new GetMetaDataLists())
    this.metadataLists$.subscribe(list =>{
      this.allMetadataList = list;
    });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }


  addList(action) {
    console.log('action', action.itemData);
    if (action.itemData === 'Dropdown') {
      this.isFieldTypeList = true;
    }
  }


  navigate(action) {
    console.log('action', action);
  }
  clearForm() {
    this.metadataFieldForm.reset({
      metadataFieldId: null,
      fieldName: '',
      fieldTypeId: null,
      metadataListId: null,
      isRequired:false,
      isDeleted: false,
      relatedField: null,
      sort: null,
      status: null
    });
  }
  add() {
    this.isEdit = false;
    this.showAllListDropdown = true;
    this.clearForm();
    this.fieldDialogList.show();
  }

  remove(data) {
    console.log(data);
    this.store.dispatch(new RemoveMetaDataFields(data.metadataFieldId));
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }

  save() {
    // this.ShowSpinner(true);
    console.log('saveDlgBtnClick', this.metadataFieldForm.controls, this.fieldType);

    //  if (this.metadataFieldForm.valid && this.metadataFieldForm.controls['fieldType'].valid) {

    const metadataField: MetadataFields = { ...this.metadataField, ...this.metadataFieldForm.value };

    if (!this.isEdit) {
      console.log('testing create user - ', metadataField);
      this.metadataFieldForm.setValue({
        metadataFieldId: metadataField.metadataFieldId ? metadataField.metadataFieldId  : null,
        fieldName: metadataField.fieldName ? metadataField.fieldName : '',
        fieldTypeId: metadataField.fieldTypeId ? metadataField.fieldTypeId : null,
        metadataListId: metadataField.metadataListId ? metadataField.metadataListId : null,
        isRequired: metadataField.isRequired ? metadataField.isRequired : false,
        isDeleted: metadataField.isDeleted ? metadataField.isDeleted : false,
        relatedField: metadataField.relatedField ? metadataField.relatedField : null,
        sort: metadataField.sort ? metadataField.sort : null,
        status: metadataField.status ? metadataField.status : null,
      });
      this.store.dispatch(new CreateMetaDataField(metadataField));
    }
    if (this.isEdit) {
      console.log('AdminMetadataFieldsComponent - edit', metadataField);
      this.metadataFieldForm.patchValue({
        metadataFieldId: metadataField.metadataFieldId,
        fieldName: metadataField.fieldName,
        fieldTypeId: metadataField.fieldTypeId,
        metadataListId: metadataField.metadataListId,
        isRequired: metadataField.isRequired,
        isDeleted: metadataField.isDeleted,
        relatedField: metadataField.relatedField,
        sort: metadataField.sort,
        status: metadataField.status
      });
      this.store.dispatch(new UpdateMetaDataField(metadataField.metadataFieldId, metadataField));
    }
    this.fieldDialogList.hide();
    //}

  }

  closeDialog() {
    this.fieldDialogList.hide();
  }

  edit(action: MetadataFields) {
    this.isEdit = true;
    this.showAllListDropdown = false;
    console.log(action);
    this.metadataFieldForm.setValue({
      metadataFieldId: action.metadataFieldId,
      fieldName: action.fieldName,
      fieldTypeId: action.fieldTypeId,
      metadataListId: action.metadataListId,
      isRequired: action.isRequired ? action.isRequired : '',
      isDeleted: action.isDeleted ? action.isDeleted : '',
      relatedField: action.relatedField ? action.relatedField : '',
      sort: action.sort ? action.sort : '',
      status: action.status ? action.status : ''
    });
    this.store.dispatch(new GetMetadataListById(action.metadataListId));
    this.metadataList$.subscribe(list => {
      this.data = list;
      console.log('AdminMetadataFieldsComponent - edit', this.data);
      this.fieldDialogList.show();
    });
    console.log('AdminMetadataFieldsComponent - edit', this.metadataFieldForm);
  }

  checkFieldType() {
    this.metadataFieldForm.valueChanges.subscribe((newForm) => {
      if (newForm.fieldTypeId === 4) {
        this.showListDropdown = true;
      } else {
        this.showListDropdown = false;
      }
    });
  }
}