import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField, CreateMetaDataList, RemoveMetaDataList, GetMetaDataLists } from './admin-media.action';
import { tap, map } from 'rxjs/operators';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { MetadataLists } from 'src/app/core/models/entity/metadata-list';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
  metadataFields: MetadataFields[];
  metadataLists: MetadataLists[];
  currentMetadataId: number;
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: [],
    metadataFields: [],
    metadataLists: [],
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

  @Action(CreateMetaDataList)
  createMetaDataList(ctx: StateContext<AdminMediaStateModel>, { payload }: CreateMetaDataList) {
    return this.adminMediaService.createMetaDataList(payload).pipe(
      tap(metadataList => {
        ctx.dispatch(new DisplayToastMessage('Create successful.'));
        const state = ctx.getState();
        ctx.setState({
          ...state,
          currentMetadataId: metadataList.id
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }


}
