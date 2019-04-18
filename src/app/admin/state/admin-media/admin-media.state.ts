import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField, GetNewUploads, ApproveUploads, RejectUploads, UpdateMetaDataField } from './admin-media.action';
import { tap, map } from 'rxjs/operators';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { GetUploadRequest } from './admin-media.action';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminMediaUploadsDetailsService } from '../../admin-media-upload-details/admin-media-uploads-details.services';

export class AdminMediaStateModel {
  newUploads: UploadHistory[];
  uploadHistory: UploadHistory[];
  metadataFields: MetadataFields[];
  currentMetadataId: number;
  currentUploadRequestFields: FieldConfiguration[];
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    newUploads: [],
    uploadHistory: [],
    metadataFields: [],
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
  static getMetaDataFields(state: AdminMediaStateModel) {
    return state.metadataFields;
  }

  @Selector()
  static getNewUploads(state: AdminMediaStateModel) {
    return state.newUploads;
  }

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
      let datas = fields.filter(x => x.metadataFieldId !== id);
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
  approveUploads(ctx: StateContext<AdminMediaState>, { id, payload, refreshList }: ApproveUploads) {
    payload.status = 30;
    ctx.dispatch(new DisplayToastMessage('Status was approved successfully.'));
    console.log('Action - approveUploads', payload);
    return this.adminMediaService.updateUploadStatus(id, payload).pipe(
      tap(status => {
        if (refreshList) {
          ctx.dispatch(new GetNewUploads());
        }
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.error, ToastType.error));
      })
    );
  }

  @Action(RejectUploads)
  rejectUploads(ctx: StateContext<AdminMediaState>, { id, payload, refreshList }: ApproveUploads) {
    payload.status = 20;
    ctx.dispatch(new DisplayToastMessage('Status was rejected successfully.'));
    console.log('Action - rejectUploads', payload);
    return this.adminMediaService.updateUploadStatus(id, payload).pipe(
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
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      }));
  }
}

