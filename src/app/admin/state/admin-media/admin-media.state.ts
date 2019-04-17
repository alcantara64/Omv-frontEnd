import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetUploadRequest, RemoveMetaDataFields, GetMetaDataFields } from './admin-media.action';
import { tap } from 'rxjs/operators';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminMediaUploadsDetailsService } from '../../admin-media-upload-details/admin-media-uploads-details.services';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
  currentUploadRequestFields: FieldConfiguration[];
  metadataFields: MetadataFields[];
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: [],
    metadataFields: [],
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