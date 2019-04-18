import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField, CreateMetaDataList, RemoveMetaDataList, GetMetaDataLists, DisableMetadataList, EnableMetadataList, UpdateMetadataList, SetCurrentMetadataListId } from './admin-media.action';
import { tap, map } from 'rxjs/operators';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListStatus } from 'src/app/core/enum/metadata-list-status';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
  metadataFields: MetadataFields[];
  metadataLists: MetadataList[];
  currentMetadataId: number;
  currentMetadataListId: number;
  currentMetadataList: MetadataList;
}
const initialMetadataList: MetadataList = {
  id: 0,
  fieldName: '',
  statusChanged: '',
  status: 1,
  isUnique: false,
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: [],
    metadataFields: [],
    metadataLists: [],
    currentMetadataListId: null,
    currentMetadataList: initialMetadataList,
    currentMetadataId: null
  }
})

export class AdminMediaState {
  constructor(private adminMediaService: AdminMediaService, private dateService: DateService) { }

  @Selector()
  static getUploadHistory(state: AdminMediaStateModel) {
    return state.uploadHistory;
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
          item.size = Math.floor((item.size) / 1000);
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
        console.log(state);
        let list = state.metadataLists;
        
        // console.log('AdminMediaState createMetaDataList new List:', list);
        ctx.setState({
          ...state,
          // metadataLists: [...list,  metadataList],
          currentMetadataId: metadataList.id
        });
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
    ctx.dispatch(new DisplayToastMessage('List was enabled successfully.'));
    return this.adminMediaService.updateMetadataList(id, payload).pipe(
      tap(list => {
        if (refreshList) {
          ctx.dispatch(new GetMetaDataLists());
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

}
