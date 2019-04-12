import { MediaUploadService } from './../../media-upload/media-upload.service';
import {
  GetHistory, GetMediaItemDetails, GetFavorites, ToggleFavorite, GetMediaTreeData,
  AddMediaItemField, RemoveMediaItemField, GetDirectoryMetadata, SetCurrentMediaItemId,
  GetMediaItem, GetDirectories, UpdateMediaItem, CreateMediaItem, GetDocuments, ClearMediaItemMetadata
} from './media.action';
import { tap, map } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { MediaItem } from "../../../core/models/entity/media";
import { GetMedia as GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { MediaItemDetailsService } from '../../media-item/media-item-details/media-item-details.service';
import { DateService } from 'src/app/core/services/business/dates/date.service';
import { Directory } from 'src/app/core/models/entity/directory';
import { FieldConfiguration } from 'src/app/shared/dynamic-components/field-setting';
import { DirectoryService } from 'src/app/core/services/business/directory/directory.service';
import { DisplayToastMessage } from 'src/app/state/app.actions';
import { ToastType } from 'src/app/core/enum/toast';
import { Document } from 'src/app/core/models/entity/document';

export class MediaStateModel {
  media: MediaItem[];
  treeviewMedia: MediaItem[];
  currentMediaItemId: any;
  currentMediaItem: MediaItem;
  metadata: FieldConfiguration[];
  itemFields: FieldConfiguration[];
  directories: any[];
  favorites: MediaItem[];
  historyItems: any[];
  totalMedia: number;
  mediaTreeData: MediaTreeGrid[];
  currentItemMetadata: any[];
  directoryMetadata: any[];
  documents: Document[];
}

const initialMediaItem: MediaItem = {
  id: '',
  name: '',
  directoryId: 0,
  directoryName: '',
  directoryParentId: 0,
  directoryParentName: '',
  type: '',
  size: 0,
  storageType: '',
  entityType: '',
  entityId: '',
  documentTypeCode: '',
  url: '',
  thumbnail: '',
  createdOn: new Date(),
  createdBy: '',
  modifiedOn: new Date(),
  modifiedBy: ''
};

@State<MediaStateModel>({
  name: 'media',
  defaults: {
    media: [],
    treeviewMedia: [],
    currentMediaItemId: null,
    currentMediaItem: null,
    directories: [],
    favorites: [],
    historyItems: [],
    totalMedia: 0,
    mediaTreeData: [],
    metadata: [],
    currentItemMetadata: [],
    itemFields: [],
    directoryMetadata: [],
    documents: []
  }
})

export class MediaState {

  //#region S E L E C T O R S

  @Selector()
  static getFavorites(state: MediaStateModel) {
    return state.favorites;
  }

  @Selector()
  static getCurrentItemId(state: MediaStateModel) {
    return state.currentMediaItemId;
  }

  @Selector()
  static getHistory(state: MediaStateModel) {
    return state.historyItems;
  }

  @Selector()
  static getMedia(state: MediaStateModel) {
    return state.media.filter(x => x.id);
  }

  @Selector()
  static getTreeViewMedia(state: MediaStateModel) {
    return state.treeviewMedia;
  }

  @Selector()
  static getCurrentMediaItem(state: MediaStateModel) {
    return state.currentMediaItem;
  }

  @Selector()
  static getTotalMedia(state: MediaStateModel) {
    return state.totalMedia;
  }

  @Selector()
  static setMediaItemId(state: MediaStateModel) {
    return state.currentMediaItemId;
  }

  @Selector()
  static getMetaData(state: MediaStateModel) {
    return state.metadata;
  }

  @Selector()
  static getMediaTreeData(state: MediaStateModel) {
    return state.mediaTreeData;
  }

  @Selector()
  static getCurrentItemMetadata(state: MediaStateModel) {
    return state.currentItemMetadata.sort(x => x.order);
  }

  @Selector()
  static getItemFields(state: MediaStateModel) {
    return state.itemFields.sort(x => x.order);
  }

  @Selector()
  static getDirectories(state: MediaStateModel) {
    return state.directories;
  }

  @Selector()
  static getDirectoryMetadata(state: MediaStateModel) {
    return state.directoryMetadata;
  }

  @Selector()
  static getDocuments(state: MediaStateModel) {
    return state.documents;
  }
  //#endregion

  constructor(private mediaService: MediaService, private mediaItemDetailsService: MediaItemDetailsService, private mediaUploadService: MediaUploadService,
    private directoryService: DirectoryService, private dateService: DateService) { }

  //#region A C T I O N S

  @Action(GetMedia)
  getMedia({ getState, setState }: StateContext<MediaStateModel>, { pageNumber, pageSize }: GetMedia) {
    return this.mediaService.getMedia(pageNumber, pageSize).pipe(
      tap(media => {
        const state = getState();
        media.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        const treeViewMedia = media.filter(x => !x.id);
        const allMedia = media.filter(x => x.id);
        setState({
          ...state,
          media: allMedia,
          treeviewMedia: treeViewMedia,
          totalMedia: media ? media.filter(x => x.id).length : 0
        });
      })
    );
  }

  @Action(GetMediaItem)
  getItem({ getState, setState }: StateContext<MediaStateModel>, { id }: GetMediaItem) {
    return this.mediaService.getMediaItem(id).pipe(
      tap(item => {
        const state = getState();
        setState({
          ...state,
          currentMediaItem: item
        });
      })
    );
  }

  @Action(GetMediaItemDetails)
  getItemDetails(ctx: StateContext<MediaStateModel>, { id }: GetMediaItemDetails) {
    return this.mediaService.getMediaItem(id).pipe(
      tap(async item => {
        console.log('MediaState item: ', item);
        if (!item) return;
        await this.mediaItemDetailsService.getMetadaFields(item).then(metadata => {
          console.log('MediaState metadata: ', metadata);
          const state = ctx.getState();
          const itemFields = metadata.filter(x => x.value);
          metadata.map(x => {
            if (x.value) {
              x.isChecked = true;
            }
          })
          ctx.setState({
            ...state,
            currentMediaItem: item,
            currentItemMetadata: metadata,
            itemFields: itemFields
          });
        });
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(ClearMediaItemMetadata)
  clearItemMetadata(ctx: StateContext<MediaStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentItemMetadata: [],
      itemFields: []
    });
  }

  @Action(UpdateMediaItem)
  updateItem(ctx: StateContext<MediaStateModel>, { id, payload }: UpdateMediaItem) {
    return this.mediaService.updateMediaItem(id, payload).pipe(
      tap(item => {
        ctx.dispatch(new DisplayToastMessage(`Details updated successfully.`));
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(CreateMediaItem)
  createItem(ctx: StateContext<MediaStateModel>, { directoryId, file, metadata }: CreateMediaItem) {
    return this.mediaUploadService.upload(directoryId, file, metadata).pipe(
      tap(item => {
        console.log('MediaState createItem: ', item);
        ctx.dispatch(new DisplayToastMessage(`Media Item successfully uploaded!`));
      }, (err) => {
        ctx.dispatch(new DisplayToastMessage(err.message, ToastType.error));
      })
    );
  }

  @Action(SetCurrentMediaItemId)
  setCurrentMediaItemId({ getState, setState }: StateContext<MediaStateModel>, { id }: SetCurrentMediaItemId) {
    const state = getState();
    setState({
      ...state,
      currentMediaItemId: id
    })
  }

  @Action(GetFavorites)
  getFavorites({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaService.getMedia().pipe(
      tap(media => {
        const state = getState();
      })
    );
  }

  @Action(ToggleFavorite)
  toggleFavorite({ getState, setState }: StateContext<MediaStateModel>, { id, payload }: ToggleFavorite) {
    return this.mediaService.toggleFavorite(id, payload).pipe(
      tap(result => {
        // const state = getState();
        // let fs = state.
        // setState({
        //   ...state,
        //   favorites: favorites
        // });
      })
    );
  }

  @Action(GetHistory)
  getHistory({ getState, setState }: StateContext<MediaStateModel>, { id }: GetHistory) {
    return this.mediaService.getHistory(id).pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        historyItems: media
      });
    }));
  }

  @Action(GetMediaTreeData)
  getMediaTreeData({ getState, setState }: StateContext<MediaStateModel>, ) {
    return this.mediaService.getMediaTreeData().pipe(
      tap(media => {
        const state = getState();
        console.log('media', media);
        setState({
          ...state,
          mediaTreeData: media,
        });
      })
    );
  }

  @Action(GetDirectories)
  getDirectories({ getState, setState }: StateContext<MediaStateModel>) {
    return this.directoryService.getDirectories().pipe(
      tap(directories => {
        const state = getState();
        setState({
          ...state,
          directories: directories
        });
      })
    );
  }

  @Action(GetDirectoryMetadata)
  async getDirectoryMetadata({ getState, setState }: StateContext<MediaStateModel>, { id }: GetDirectoryMetadata) {
    await this.mediaUploadService.getDirectoryMetadata(id).then(metadata => {
      console.log('MediaState getDirectoryMetadata: ', metadata);
      const state = getState();
      setState({
        ...state,
        directoryMetadata: metadata
      });
    });
  }

  @Action(AddMediaItemField)
  addItemField({ getState, setState }: StateContext<MediaStateModel>, { payload }: AddMediaItemField) {
    const state = getState();
    let itemFields = state.itemFields;
    itemFields.push(payload);
    let itemMetadata = state.currentItemMetadata;
    itemMetadata.map(x => {
      if (x.name === payload.name) {
        x.isChecked = true;
        x.isSelected = false;
      }
    });
    setState({
      ...state,
      currentItemMetadata: itemMetadata,
      itemFields: itemFields
    });
  }

  @Action(RemoveMediaItemField)
  removeItemField({ getState, setState }: StateContext<MediaStateModel>, { name }: RemoveMediaItemField) {
    const state = getState();
    let itemFields = state.itemFields;
    itemFields = itemFields.filter(x => x.name !== name);
    let itemMetadata = state.currentItemMetadata;
    itemMetadata.map(x => {
      if (x.name === name) {
        x.isChecked = false;
        x.isSelected = false;
      }
    });
    setState({
      ...state,
      itemFields: itemFields
    })
  }

  @Action(GetDocuments)
  getDocuments({ getState, setState }: StateContext<MediaStateModel>, ) {
    return this.directoryService.getDocuments().pipe(
      tap(documents => {
        documents.map(item => {
          item.modifiedOnString = this.dateService.formatToString(item.modifiedOn, 'MMM DD, YYYY');
        });
        const state = getState();
        console.log('documents', documents);
        setState({
          ...state,
          documents: documents,
          totalMedia: documents ? documents.length : 0
        });
      })
    );
  }
  //#endregion
}
