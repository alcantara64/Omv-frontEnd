import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetUploadRequest } from './admin-media.action';
import { tap } from 'rxjs/operators';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminMediaUploadsDetailsService } from '../../admin-media-upload-details/admin-media-uploads-details.services';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
  currentUploadRequestFields: FieldConfiguration[];
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: [],
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

  @Action(GetUploadHistory)
  getUploadHistory({ getState, setState }: StateContext<AdminMediaStateModel>) {

    return this.adminMediaService.getUploadHistory().pipe(
      tap(history => {
        history.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        history.map(item => {
         item.size =  Math.floor((item.size) / 1000);
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
  getUploadRequest({ getState, setState }: StateContext<AdminMediaStateModel>, { id }: GetUploadRequest) {
    return this.adminMediaUploadsDetailsService.getUploadRequestFields(id).pipe(
      tap(fields => {
        console.log('AdminMediaState - getUploadRequest - fields: ', fields);
        const state = getState();
        setState({
          ...state,
          currentUploadRequestFields: fields
        });
      })
    );
  }
}