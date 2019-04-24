import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import {CreateMetaDataField, CreateMetaDataList, RemoveMetaDataList, GetMetaDataLists, DisableMetadataList, EnableMetadataList, UpdateMetadataList, SetCurrentMetadataListId, GetMetaDataList } from './admin-media.action';
import { CreateMetaDataListItem, RemoveMetaDataListItem, GetMetaDataListItem, GetMetaDataListsItem, GetMetaDataList as GetMetaDataListById } from './admin-media.action';
import { tap, map } from 'rxjs/operators';
import { GetUploadHistory, GetUploadRequest, RemoveMetaDataFields, GetMetaDataFields } from './admin-media.action';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminMediaUploadsDetailsService } from '../../admin-media-upload-details/admin-media-uploads-details.services';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListStatus } from 'src/app/core/enum/metadata-list-status';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
  currentUploadRequestFields: FieldConfiguration[];
  metadataFields: MetadataFields[];
  metadataLists: MetadataList[];
  metadataListsItem: MetadataListItem[];
  currentMetadataId: number;
  currentMetadataListId: number;
  currentMetadataList: MetadataList;
}
const initialMetadataList: MetadataList = {
  id: 0,
  fieldName: '',
  statusName: '',
  status: 1,
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: [],
    metadataFields: [],
    metadataLists: [],
    metadataListsItem: [],
    currentMetadataListId: null,
    currentMetadataList: initialMetadataList,
    currentMetadataId: null,
    currentUploadRequestFields: null
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
    return state.metadataLists.filter(x => x.status === 0);
  }
  @Selector()
  static getCurrentMetadataListId(state: AdminMediaStateModel) {
    return state.currentMetadataListId;
  }

  @Selector()
  static getCurrentMetadataList(state: AdminMediaStateModel) {
    return state.currentMetadataList;
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

  @Action(GetMetaDataFields)
  getMetaDataFields({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getMetadataField().pipe(
      tap(fields => {
        const state = getState();
        setState({
          ...state,
          metadataFields: fields
        });
      })
    );
  }
  @Action(RemoveMetaDataFields)
  removeMetaDataFields(ctx: StateContext<AdminMediaStateModel>, { id }: RemoveMetaDataFields) {
    return this.adminMediaService.removeMetadataField(id).pipe(map(fields => {
      let datas = fields.filter(x => x.id !== id);
      fields = datas;
      const state = ctx.getState();
      ctx.setState({
        ...state,
        metadataFields: fields
      });
    }));
  }

  @Action(CreateMetaDataField)
  createMetaDataField(ctx: StateContext<AdminMediaStateModel>, { payload }: CreateMetaDataField) {
    return this.adminMediaService.createMetaDataField(payload).pipe(
      tap(metadataField => {
        ctx.dispatch(new DisplayToastMessage('Create successful.'));
        const state = ctx.getState();
        ctx.setState({
          ...state,
          currentMetadataId: metadataField.id
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(GetMetaDataLists)
  getMetaDataLists({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getMetadataList().pipe(
      tap(lists => {
        const state = getState();
        setState({
          ...state,
          metadataLists: lists
        });
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

  @Action(GetMetaDataListItem)
  getMetaDataListItem({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getMetadataList().pipe(
      tap(lists => {
        const state = getState();
        setState({
          ...state,
          metadataLists: lists
        });
      })
    );
  }

  @Action(GetMetaDataListsItem)
  getMetaDataListsItem({ getState, setState }: StateContext<AdminMediaStateModel>,{id}) {
    console.log(id, 'My Id');

    return this.adminMediaService.getMetadataListsItem().pipe(
      tap(lists => {
        const state = getState();
 console.log(lists, 'this is my list');
      let filteredlist =  lists.filter(x => x.listId  === id)
      
        setState({
          ...state,
          metadataListsItem: filteredlist
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
        const UpdateMetadataList =[...list, metadataList];
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
  createMetaDataListItem(ctx: StateContext<AdminMediaStateModel>, { payload }: CreateMetaDataListItem) {
    return this.adminMediaService.createMetaDataListItem(payload).pipe(
      tap(metadataListItem => {
        ctx.dispatch(new DisplayToastMessage('Create successful.'));
        const state = ctx.getState();
       
        let list = state.metadataListsItem;
        const UpdateMetadataList =[...list, metadataListItem];
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
      let datas = lists.filter(x => x.id !== id);
      lists = datas;
      const state = ctx.getState();
      ctx.setState({
        ...state,
        metadataLists: lists
      });
    }));
  }
  @Action(RemoveMetaDataListItem)
  removeMetaDataListsItem(ctx: StateContext<AdminMediaStateModel>, { id }: RemoveMetaDataListItem) {
    return this.adminMediaService.removeMetadataListItem(id).pipe(map(lists => {
      let datas = lists.filter(x => x.id !== id);
      lists = datas;
      const state = ctx.getState();
      ctx.setState({
        ...state,
        metadataListsItem: lists
      });
    }));
  }
}
