import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory } from './admin-media.action';
import { tap } from 'rxjs/operators';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';

export class AdminMediaStateModel {
  uploadHistory: UploadHistory[];
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    uploadHistory: []
  }
})

export class AdminMediaState {
  constructor(private adminMediaService: AdminMediaService) { }

  @Selector()
  static getUploadHistory(state: AdminMediaStateModel) {
    return state.uploadHistory;
  }

  @Action(GetUploadHistory)
  getUploadHistory({ getState, setState }: StateContext<AdminMediaStateModel>) {
    return this.adminMediaService.getUploadHistory().pipe(
      tap(history => {
        const state = getState();
        console.log('AdminMediaState - getUploadHistory - history: ', history);
        setState({
          ...state,
          uploadHistory: history
        });
      })
    );
  }
}