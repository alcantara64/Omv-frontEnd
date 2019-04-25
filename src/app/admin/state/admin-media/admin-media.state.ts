import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { CreateMetaDataField, CreateMetaDataList, RemoveMetaDataList, GetMetaDataLists, DisableMetadataList, EnableMetadataList, UpdateMetadataList, SetCurrentMetadataListId, GetMetaDataList, GetMetaDataListsItemById, GetMetaDataDetailById, UpdateMetadataListItem, GetUploadHistory, GetMetaDataFields, GetUploadRequest, RemoveMetaDataFields, GetNewUploads, ApproveUploads, RejectUploads, UpdateMetaDataField, GetFieldTypes, GetMetadataListById } from './admin-media.action';
import { CreateMetaDataListItem, RemoveMetaDataListItem, GetMetaDataListsItem, GetMetaDataList as GetMetaDataListById } from './admin-media.action';
import { tap, map } from 'rxjs/operators';

import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminMediaUploadsDetailsService } from '../../admin-media-upload-details/admin-media-uploads-details.services';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { MetadataListStatus } from 'src/app/core/enum/metadata-list-status';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataFieldType } from 'src/app/core/models/entity/metadata-fieldtype';



export class AdminMediaStateModel {
  newUploads: UploadHistory[];
  uploadHistory: UploadHistory[];
  metadataFields: MetadataFields[];
  metadataLists: MetadataList[];
  metadataListsItem: MetadataListItem[];
  currentMetadataId: number;
  currentMetadataListId: number;
  currentMetadataList: MetadataList;
  currentMetadataListItem: MetadataListItem[];
  currentMetadataDetail: MetadataDetail;
  metadataList: MetadataList[];
  currentUploadRequestFields: FieldConfiguration[];
  metadataFieldTypes: MetadataFieldType[];
}
const initialMetadataList: MetadataList = {
  id: 0,
  metadataListName: '',
  statusName: '',
  status: 1,
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    newUploads: [],
    uploadHistory: [],
    metadataFields: [],
    metadataLists: [],
    metadataListsItem: [],
    currentMetadataListId: null,
    currentMetadataList: initialMetadataList,
    currentMetadataDetail: null,
    metadataList: [],
    currentMetadataId: null,
    currentUploadRequestFields: null,
    currentMetadataListItem: [],
    metadataFieldTypes: []
  }
})

export class AdminMediaState {
  constructor(private adminMediaService: AdminMediaService, private adminMediaUploadsDetailsService: AdminMediaUploadsDetailsService,
    private dateService: DateService) { }

  @Selector()
  static getUploadHistory(state: AdminMediaStateModel) {
    return state.uploadHistory;
  }

  @Selector()
  static getCurrentUploadRequestFields(state: AdminMediaStateModel) {
    return state.currentUploadRequestFields;
  }

  @Selector()
  static getMetaDataFields(state: AdminMediaStateModel) {
    return state.metadataFields;
  }
  @Selector()
  static getMetaDataLists(state: AdminMediaStateModel) {
    return state.metadataLists;
  }

  @Selector()
  static getMetaDataListItem(state: AdminMediaStateModel) {
    return state.metadataListsItem;
  }

  @Selector()
  static getActiveMetadataList(state: AdminMediaStateModel) {
    return state.metadataLists.filter(x => x.status === MetadataListStatus.Active);
  }


  @Selector()
  static getDisabledMetadataList(state: AdminMediaStateModel) {
    return state.metadataLists.filter(x => x.status === MetadataListStatus.Disabled);
  }
  @Selector()
  static getCurrentMetadataListId(state: AdminMediaStateModel) {
    return state.currentMetadataListId;
  }

  @Selector()
  static getCurrentMetadataList(state: AdminMediaStateModel) {
    return state.currentMetadataList;
  }

  @Selector()
  static getCurrentMetadataListItem(state: AdminMediaStateModel) {
    return state.currentMetadataListItem;
  }

  @Selector()
  static getCurrentMetadataDetail(state: AdminMediaStateModel) {
    return state.currentMetadataDetail;
  }
  @Selector()
  static getNewUploads(state: AdminMediaStateModel) {
    return state.newUploads;
  }

  @Selector()
  static getMetadataListById(state: AdminMediaStateModel) {
    return state.metadataList;
  }

  @Selector()
  static getMetadataFieldTypes(state: AdminMediaStateModel) {
    return state.metadataFieldTypes;
  }


  @Action(GetUploadHistory)
  getUploadHistory({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getUploadHistory().pipe(
      tap(history => {
        history.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        history.map(item => {
          // item.size = Math.floor((item.size) / 1000);
        });
        const state = getState();
        console.log('AdminMediaState - getUploadHistory - history: ', history);
        setState({
          ...state,
          uploadHistory: history
        });
      })
    );
  }
  @Action(GetMetaDataFields)
  getMetaDataFields({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getMetadataField().pipe(
      tap(fields => {
        const state = getState();
        setState({
          ...state,
          metadataFields: fields
        });
      }
      ));
  }
  @Action(GetUploadRequest)
  async getUploadRequest({ getState, setState }: StateContext<AdminMediaStateModel>, { id }: GetUploadRequest) {
    return this.adminMediaUploadsDetailsService.getUploadRequestFields(id)
      .then(fields => {
        console.log('AdminMediaState - getUploadRequest - fields: ', fields);
        const state = getState();
        setState({
          ...state,
          currentUploadRequestFields: fields
        });
      }
      );
  }

  @Action(RemoveMetaDataFields)
  removeMetaDataFields(ctx: StateContext<AdminMediaStateModel>, { id }: RemoveMetaDataFields) {
    return this.adminMediaService.removeMetadataField(id).pipe(map(fields => {
      const state = ctx.getState();
      ctx.dispatch(new DisplayToastMessage('Delete successful.'));
      ctx.dispatch(new GetMetaDataFields());
      ctx.setState({
        ...state,
        metadataFields: fields
      });
    },
      (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      }));
  }

  @Action(CreateMetaDataField)
  createMetaDataField(ctx: StateContext<AdminMediaStateModel>, { payload }: CreateMetaDataField) {
    return this.adminMediaService.createMetaDataField(payload).pipe(
      tap(metadataField => {
        ctx.dispatch(new DisplayToastMessage('Create successful.'));
        ctx.dispatch(new GetMetaDataFields());
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(GetNewUploads)
  getNewUploads({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getNewUploads().pipe(
      tap(newUploads => {
        const state = getState();

        console.log('AdminMediaState - getNewUploads - history: ', newUploads);
        setState({
          ...state,
          newUploads: newUploads
        });
      })
    );
  }

  @Action(ApproveUploads)
  approveUploads(ctx: StateContext<AdminMediaStateModel>, { id, refreshList }: ApproveUploads) {
    console.log('Action - approveUploads', id);
    return this.adminMediaService.approveUploads(id).pipe(
      tap(status => {
        ctx.dispatch(new DisplayToastMessage('Status was approved successfully.'));
        if (refreshList) {
          ctx.dispatch(new GetNewUploads());
        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }



  @Action(GetMetaDataList)
  getMetaDataList({ getState, setState }: StateContext<AdminMediaStateModel>, { id }: GetMetaDataList) {
    return this.adminMediaService.getMetadataListById(id).pipe(
      tap(lists => {
        const state = getState();
        console.log(lists, 'the current metadata list Item')
        setState({
          ...state,
          currentMetadataList: lists ? lists : null
        });
        console.log(getState(), 'current list')
      })
    );
  }

  @Action(GetMetaDataListsItem)
  getMetaDataListItem({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getMetadataList().pipe(
    )
  }
  @Action(RejectUploads)
  rejectUploads(ctx: StateContext<AdminMediaStateModel>, { id, refreshList }: RejectUploads) {
    ctx.dispatch(new DisplayToastMessage('Status was rejected successfully.'));
    console.log('Action - rejectUploads');
    return this.adminMediaService.rejectUploads(id).pipe(
      tap(status => {
        if (refreshList) {
          ctx.dispatch(new GetNewUploads());
        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(UpdateMetaDataField)
  updateMetaDataField(ctx: StateContext<AdminMediaStateModel>, { id, payload }: UpdateMetaDataField) {
    return this.adminMediaService.updateMetaDataField(id, payload).pipe(
      tap(field => {
        ctx.dispatch(new DisplayToastMessage("Field updated successfully"));
        ctx.dispatch(new GetMetaDataFields());
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      }));
  }

  @Action(GetMetaDataLists)
  getMetaDataLists({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getMetadataLists().pipe(
      tap(lists => {
        const state = getState();
        setState({
          ...state,
          metadataLists: lists
        });
      })
    );
  }

  @Action(GetMetaDataListsItemById)
  getMetaDataListsItemById({ getState, setState }: StateContext<AdminMediaStateModel>, { id }: GetMetaDataListsItemById) {
    console.log(id, 'My Id');

    return this.adminMediaService.getMetaDataListItemById(id).pipe(
      tap(lists => {
        const state = getState();
        setState({
          ...state,
          currentMetadataListItem: lists
        });
      })
    );
  }

  @Action(SetCurrentMetadataListId)
  setCurrentMetadataListId({ getState, setState }: StateContext<AdminMediaStateModel>, { id }: SetCurrentMetadataListId) {
    var state = getState();
    return setState({
      ...state,
      currentMetadataListId: id,
    });
  }

  @Action(CreateMetaDataList)
  createMetaDataList(ctx: StateContext<AdminMediaStateModel>, { payload }: CreateMetaDataList) {
    return this.adminMediaService.createMetaDataList(payload).pipe(
      tap(metadataList => {
        ctx.dispatch(new DisplayToastMessage('Create successful.'));
        const state = ctx.getState();
        ctx.dispatch(new GetMetaDataLists());
        let list = state.metadataLists;
        const UpdateMetadataList = [...list, metadataList];
        // console.log('AdminMediaState createMetaDataList new List:', list);
        ctx.setState({
          ...state,
          metadataLists: UpdateMetadataList,

        });
        console.log(ctx.getState(), 'check my current state')
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(CreateMetaDataListItem)
  createMetaDataListItem(ctx: StateContext<AdminMediaStateModel>, { id, payload }: CreateMetaDataListItem) {
    return this.adminMediaService.createMetaDataListItem(id, payload).pipe(
      tap(metadataListItem => {
        console.log(metadataListItem, 'this is the response from metadalistItem')
        if (metadataListItem) {
          ctx.dispatch(new DisplayToastMessage('Create successful.'));
        }
        const state = ctx.getState();
        ctx.dispatch(new GetMetaDataListsItemById(id));
        let list = state.metadataListsItem;
        const UpdateMetadataList = [...list, metadataListItem];
        // console.log('AdminMediaState createMetaDataList new List:', list);
        ctx.setState({
          ...state,
          metadataListsItem: UpdateMetadataList,

        });
        console.log(ctx.getState(), 'check my current state')
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(UpdateMetadataList)
  updateMetadataList(ctx: StateContext<AdminMediaStateModel>, { payload, id }: UpdateMetadataList) {
    return this.adminMediaService.updateMetadataList(id, payload).pipe(
      tap(list => {
        ctx.dispatch(new DisplayToastMessage('List updated successfully.'));
        ctx.dispatch(new GetMetaDataDetailById(id));
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(DisableMetadataList)
  disableMetadataList(ctx: StateContext<AdminMediaStateModel>, { id, payload, refreshList }: DisableMetadataList) {
    payload.status = 0;
    ctx.dispatch(new DisplayToastMessage('List was disabled successfully.'));
    return this.adminMediaService.updateMetadataList(id, payload).pipe(
      tap(list => {
        if (refreshList) {
          ctx.dispatch(new GetMetaDataLists());
        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(EnableMetadataList)
  enableMetadataList(ctx: StateContext<AdminMediaStateModel>, { id, payload, refreshList }: EnableMetadataList) {
    payload.status = 1;

    return this.adminMediaService.updateMetadataList(id, payload).pipe(
      tap(list => {


        if (refreshList) {
          console.log(payload, 'payload')
          ctx.dispatch(new GetMetaDataLists());
          ctx.dispatch(new DisplayToastMessage('List was enabled successfully.'));

        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(RemoveMetaDataList)
  removeMetaDataLists(ctx: StateContext<AdminMediaStateModel>, { id }: RemoveMetaDataList) {
    return this.adminMediaService.removeMetadataList(id).pipe(map(lists => {
      const state = ctx.getState();
      ctx.dispatch(new DisplayToastMessage('Delete Successful'));
      ctx.dispatch(new GetMetaDataLists());
      ctx.setState({
        ...state,
        metadataLists: lists
      });
    },
      (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error))
      }));
  }
  @Action(RemoveMetaDataListItem)
  removeMetaDataListsItem(ctx: StateContext<AdminMediaStateModel>, { id, metadataListItemId }: RemoveMetaDataListItem) {
    return this.adminMediaService.removeMetadataListItem(id, metadataListItemId).pipe(map(lists => {
      const state = ctx.getState();
      ctx.dispatch(new DisplayToastMessage('Delete Successful'));
      ctx.dispatch(new GetMetaDataListsItemById(id));
      ctx.setState({
        ...state,
        metadataListsItem: lists
      });
    },
      (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error))
      }));
  }

  @Action(GetMetaDataDetailById)
  getMetaDataDetailById(ctx: StateContext<AdminMediaStateModel>, { id }: GetMetaDataDetailById) {
    return this.adminMediaService.getMetadataDetail(id).pipe(map(details => {
      const state = ctx.getState();
      console.log(details, 'GetMetaDataDetailById - get by id')
      ctx.setState({
        ...state,
        currentMetadataDetail: details
      });
    }))
  }




  @Action(GetMetadataListById)
  getMetadataListById(ctx: StateContext<AdminMediaStateModel>, { id }: GetMetadataListById) {
    console.log('Action - getMetadataListById', id);
    return this.adminMediaService.getMetadataListById(id).pipe(
      tap(metadataList => {
        const state = ctx.getState();

        console.log('AdminMediaState - getNewUploads - history: ', metadataList);
        ctx.setState({
          ...state,
          currentMetadataList: metadataList
        });
      }));
  }

  @Action(GetFieldTypes)
  getFieldType(ctx: StateContext<AdminMediaStateModel>, { }: GetFieldTypes) {
    console.log('Action - getFieldType');
    return this.adminMediaService.getFieldTypes().pipe(
      tap(fieldTypes => {
        const state = ctx.getState();

        console.log('AdminMediaState - GetFieldTypes', fieldTypes);
        ctx.setState({
          ...state,
          metadataFieldTypes: fieldTypes
        });
      }));
  }

}
