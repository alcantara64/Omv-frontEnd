import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetMetaDataFields, RemoveMetaDataFields } from './admin-media.action';
import { tap } from 'rxjs/operators';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
  metadataFields: MetadataFields[];
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: [],
    metadataFields: []
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


  @Action(GetUploadHistory)
  getUploadHistory({ getState, setState }: StateContext<AdminMediaStateModel>) {

    return this.adminMediaService.getUploadHistory().pipe(
      tap(history => {
        history.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        history.map(item => {
        //  item.size =  Math.floor((item.size) / 1000);
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
  removeMetaDataFields(ctx: StateContext<AdminMediaStateModel>, { id}: RemoveMetaDataFields) {
    return this.adminMediaService.removeMetadataField(id).pipe(
      tap((data) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          metadataFields: data
        })
        // ctx.dispatch(new DisplayToastMessage(`${payload.length} member(s) removed.`));
       // ctx.dispatch(new GetMetaDataFields());
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      }));
  }
}