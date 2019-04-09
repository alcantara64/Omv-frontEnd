import { MediaUploadService } from './../../media-upload/media-upload.service';
import { GetHistory, GetMediaItemDetails, GetFavorites, ToggleFavorite, GetMediaTreeData, GetMetadata,
  GetItemMetadata, AddMediaItemField, RemoveMediaItemField, GetDirectoryMetadata, SetCurrentMediaItemId } from './media.action';
import { tap, map } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { MediaItem } from "../../../core/models/entity/media";
import { GetMedia as GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { AdminMediaAccessService } from 'src/app/core/services/business/admin-media-access/admin-media-access.service';
import { MetadataService } from 'src/app/shared/dynamic-components/metadata.service';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';
import { MediaItemDetailsService } from '../../media-item/media-item-details/media-item-details.service';

export class MediaStateModel {
  media: MediaItem[];
  currentMediaItemId: number;
  favorites: MediaItem[];
  currentMediaItem: MediaItem;
  historyItems: any[];
  metadata: any[];
  totalMedia: number;
  mediaTreeData: MediaTreeGrid[];
  currentItemMetadata: any[];
  itemFields: any[];
  directoryMetadata: any[];
}

const initialMediaItem: MediaItem = {
  id: '',
  name: '',
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
    currentMediaItemId: null,
    favorites: [],
    currentMediaItem: initialMediaItem,
    historyItems: [],
    totalMedia: 0,
    mediaTreeData:[],
    metadata: [],
    currentItemMetadata: [],
    itemFields: [],
    directoryMetadata: []
  }
})

export class MediaState {

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
    return state.media;
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
  static getDirectoryMetadata(state: MediaStateModel) {
    return state.directoryMetadata;
  }

  constructor(private mediaService: MediaService,
    private metaDataService: MetadataService, private mediaDataService: MediaDataService,
    private mediaItemDetailsService: MediaItemDetailsService, private mediaUploadService: MediaUploadService) { }
  
  @Action(GetMedia)
  getMedia({ getState, setState }: StateContext<MediaStateModel>, {pageNumber, pageSize}: GetMedia){
    return this.mediaService.getMedia(pageNumber, pageSize).pipe(
      tap(media => {
        const state = getState();
        console.log('MediaState getMedia: ', media);
        setState({
          ...state,
          media: media,
          totalMedia: media ? media.length : 0
        });
      })
    );
  }

  @Action(GetMediaItemDetails)
  getMediaItem({ getState, setState }: StateContext<MediaStateModel>, { id }: GetMediaItemDetails) {
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
  getMediaTreeData({ getState, setState }: StateContext<MediaStateModel>,){
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


  // @Action(GetDirectories)
  // getDirectories({ getState, setState }: StateContext<MediaStateModel>) {
  //   return this.adminMediaService.getMediaAccess().pipe(tap(media => {
  //     const state = getState();
  //     setState({
  //       ...state,
  //       historyItems: media
  //     });
  //   }));
  // }

  @Action(SetCurrentMediaItemId)
  setCurrentMediaItemId({ getState, setState }: StateContext<MediaStateModel>, { id }: SetCurrentMediaItemId) {
    const state = getState();
    setState({
      ...state,
      currentMediaItemId: id
    })
  }

  @Action(GetDirectoryMetadata)
  async getDirectoryMetadata({ getState, setState }: StateContext<MediaStateModel>, {id}: GetDirectoryMetadata) {
    await this.mediaUploadService.getDirectoryMetadata(id).then(metadata => {
      console.log('MediaState getDirectoryMetadata: ', metadata);
      const state = getState();
      setState({
        ...state,
        directoryMetadata: metadata
      });
    });
  }

  @Action(GetMetadata)
  async getMetadata({ getState, setState }: StateContext<MediaStateModel>, {id}: GetMetadata) {
    await this.mediaItemDetailsService.getMetadaFields(id).then(metadata => {
      console.log('MediaState metadata: ', metadata);
      const state = getState();
      const itemConfig = metadata.filter(x => x.value);
      metadata.map(x => {
        if (x.value) {
          x.isChecked = true;
        }
      })
      setState({
        ...state,
        currentItemMetadata: metadata,
        itemFields: itemConfig
      });
    });
  }

  @Action(GetItemMetadata)
  async getItemMetadata({ getState, setState }: StateContext<MediaStateModel>, {id}: GetItemMetadata) {
    this.metaDataService.getFinalData().then(resp => {
      
      console.log('MediaState getItemMetadata: ', resp); 
      const state = getState();
      const itemConfig = resp.filter(x => x.value);
      resp.map(x => {
        if (x.value) {
          x.isChecked = true;
        }
      });
      setState({
        ...state,
        currentItemMetadata: resp,
        itemFields: itemConfig
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
}
