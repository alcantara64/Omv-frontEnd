import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';
import { GetUploadHistory, GetMetaDataFields, RemoveMetaDataFields, CreateMetaDataField, GetNewUploads, ApproveUploads, RejectUploads, UpdateMetaDataField, GetMetadataListById, GetFieldTypes, GetMetaDataLists } from './admin-media.action';
import { tap, map } from 'rxjs/operators';
import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { GetUploadRequest } from './admin-media.action';
import { AdminMediaService } from 'src/app/core/services/business/admin-media/admin-media.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { AdminMediaUploadsDetailsService } from '../../admin-media-upload-details/admin-media-uploads-details.services';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataFieldType } from 'src/app/core/models/entity/metadata-fieldtype';



export class AdminMediaStateModel {
  newUploads: UploadHistory[];
  uploadHistory: UploadHistory[];
  metadataFields: MetadataFields[];
  metadataList: MetadataList[];
  metadataLists: MetadataList[];
  currentMetadataId: number;
  currentUploadRequestFields: FieldConfiguration[];
  metadataFieldTypes: MetadataFieldType[];
}

@State<AdminMediaStateModel>({
  name: 'admin_media',
  defaults: {
    newUploads: [],
    uploadHistory: [],
    metadataFields: [],
    metadataList: [],
    metadataLists: [],
    currentMetadataId: null,
    currentUploadRequestFields: null,
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
        newUploads.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
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


    @Action(GetMetadataListById)
    getMetadataListById(ctx: StateContext < AdminMediaStateModel >, { id }: GetMetadataListById) {
      console.log('Action - getMetadataListById', id);
      return this.adminMediaService.getMetadataListById(id).pipe(
        tap(metadataList => {
          const state = ctx.getState();

          console.log('AdminMediaState - getNewUploads - history: ', metadataList);
          ctx.setState({
            ...state,
            metadataList: metadataList
          });
        }));
    }

    @Action(GetFieldTypes)
    getFieldType(ctx: StateContext < AdminMediaStateModel >, {} : GetFieldTypes) {
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