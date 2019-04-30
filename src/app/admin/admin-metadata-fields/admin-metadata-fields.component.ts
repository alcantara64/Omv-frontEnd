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
import { ShowSpinner } from 'src/app/state/app.actions';

@Component({
  selector: 'app-admin-metadata-fields',
  templateUrl: './admin-metadata-fields.component.html',
  styleUrls: ['./admin-metadata-fields.component.css']
})
export class AdminMetadataFieldsComponent extends ListComponent implements OnInit, OnDestroy {
  columns: GridColumn[] = [
    { headerText: 'Name', field: 'fieldName', width: '70' },
    { headerText: 'Type', field: 'type', width: '80' },
    { headerText: 'List', width: '150', field: 'metadataListName' }];

  public listFields: Object = { text: 'itemDescription', value: 'itemValue' };
  public createListFields: Object = { text: 'metadataListName', value: 'id' };

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
  @Select(AdminMediaState.getActiveMetadataList) metadataLists$: Observable<MetadataList[]>;
  metadataFields: MetadataFields[];
  data: MetadataList[];
  isEdit: boolean;
  showListDropdown: boolean = false;
  showAllListDropdown: boolean;
  allMetadataList: MetadataList[];
  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;
  selectedMetadataFieldId: any;
  hideListName: boolean;

  constructor(protected store: Store,
    private formBuilder: FormBuilder, ) {
    super(store);
    this.ShowLefNav(true);
    this.componentActive = true;
  }
  ngOnInit() {
    this.metadataFieldForm = this.formBuilder.group({
      metadataFieldId: [null],
      fieldName: ['', [Validators.required, Validators.minLength(3)]],
      fieldTypeId: ['', [Validators.required]],
      metadataListId: [''],

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
    this.metadataLists$.subscribe(list => {
      this.allMetadataList = list;
    });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  public closeBtnDlgClick: EmitType<object> = () => {
    this.confirmDialog.hide();
  }
  show(data) {
    console.log('event', data);
    this.selectedMetadataFieldId = data.metadataFieldId;
    this.confirmDialog.show();
  }
  public RemoveDlgBtnClick: EmitType<object> = () => {
    this.store.dispatch(new RemoveMetaDataFields(this.selectedMetadataFieldId));
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
    this.confirmDialog.hide();
  }
  confirmDlgButtons = [{ click: this.RemoveDlgBtnClick.bind(this), buttonModel: { content: 'Yes', isPrimary: true } },
  { click: this.closeBtnDlgClick.bind(this), buttonModel: { content: 'No' } }];

  cancelRemove() {
    this.confirmDialog.hide();
  }
  addList(action) {
    if (action.itemData === 'Dropdown') {
      this.isFieldTypeList = true;
    }
  }

  navigate(action) {
  }
  clearForm() {
    this.metadataFieldForm.reset({
      metadataFieldId: null,
      fieldName: '',
      fieldTypeId: null,
      metadataListId: null,

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
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new RemoveMetaDataFields(data.metadataFieldId));
    this.metadataFields$.subscribe(fields => {
      this.metadataFields = fields;
    });
  }

  save() {
    if (this.metadataFieldForm.valid || this.metadataFieldForm.controls['fieldType'].dirty) {
      const metadataField: MetadataFields = { ...this.metadataField, ...this.metadataFieldForm.value };
      if (!this.isEdit) {
        this.metadataFieldForm.setValue({
          metadataFieldId: metadataField.metadataFieldId ? metadataField.metadataFieldId : null,
          fieldName: metadataField.fieldName ? metadataField.fieldName : '',
          fieldTypeId: metadataField.fieldTypeId ? metadataField.fieldTypeId : null,
          metadataListId: metadataField.metadataListId ? metadataField.metadataListId : null,
        });
        this.store.dispatch(new CreateMetaDataField(metadataField));
      }
      if (this.isEdit) {
        this.metadataFieldForm.patchValue({
          metadataFieldId: metadataField.metadataFieldId,
          fieldName: metadataField.fieldName,
          fieldTypeId: metadataField.fieldTypeId,
          metadataListId: metadataField.metadataListId,
        });
        if(metadataField.fieldTypeId !== 4){
       this.hideListName = true;
      }
      else{
        this.hideListName = false;
      }
        this.store.dispatch(new UpdateMetaDataField(metadataField.metadataFieldId, metadataField));
      }
      this.fieldDialogList.hide();
    }
  }

  closeDialog() {
    this.fieldDialogList.hide();
  }

  edit(action: MetadataFields) {
    this.isEdit = true;
    this.showAllListDropdown = false;
    this.metadataFieldForm.setValue({
      metadataFieldId: action.metadataFieldId,
      fieldName: action.fieldName,
      fieldTypeId: action.fieldTypeId,
      metadataListId: action.metadataListId,

    });
    this.store.dispatch(new GetMetadataListById(action.metadataListId));
    this.metadataList$.subscribe(list => {
      this.data = list;
      this.fieldDialogList.show();
    });
  }

  checkFieldType() {
    this.metadataFieldForm.valueChanges.subscribe((newForm) => {
      if (newForm.fieldTypeId === 4) {
        this.showListDropdown = true;
      } else {
        newForm.metadataListId = null;
        newForm.metadataListName = null;
        this.showListDropdown = false;
     
      }
    });
  }
}