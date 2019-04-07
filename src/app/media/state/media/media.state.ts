import { GetHistory, GetMediaItem, GetFavorites, ToggleFavorite, GetMediaTreeData, GetMetadata, GetMediaItemFields, GetAllMediaItemFields, AddMediaItemField, RemoveMediaItemField } from './media.action';
import { tap, map } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { MediaItem } from "../../../core/models/entity/media";
import { GetMedia as GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { AdminMediaAccessService } from 'src/app/core/services/business/admin-media-access/admin-media-access.service';
import { MetadataService } from 'src/app/shared/dynamic-components/metadata.service';
import { MediaDataService } from 'src/app/core/services/data/media/media.data.service';

export class MediaStateModel {
  media: MediaItem[];
  favorites: MediaItem[];
  currentMediaItem: MediaItem;
  historyItems: any[];
  metadata: any[];
  totalMedia: number;
  mediaTreeData: MediaTreeGrid[];
  allItemFields: any[];
  itemFields: any[];
}

const initialMediaItem: MediaItem = {
  id: 0,
  name: '',
  type: '',
  size: '0 KB',
  date: new Date(),
  isFavorite: false,
  imageUrl: ''
};

@State<MediaStateModel>({
  name: 'media',
  defaults: {
    media: [],
    favorites: [],
    currentMediaItem: initialMediaItem,
    historyItems: [],
    totalMedia: 0,
    mediaTreeData:[],
    metadata: [],
    allItemFields: [],
    itemFields: []
  }
})

export class MediaState {

  @Selector()
  static getFavorites(state: MediaStateModel) {
    return state.favorites;
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
  static getAllItemFields(state: MediaStateModel) {
    return state.allItemFields;
  }
  
  @Selector()
  static getItemFields(state: MediaStateModel) {
    return state.itemFields;
  }

  constructor(private mediaService: MediaService, private adminMediaService: AdminMediaAccessService, 
    private metaDataService: MetadataService, private mediaDataService: MediaDataService) { }
  
  @Action(GetMedia)
  getMedia({ getState, setState }: StateContext<MediaStateModel>, {pageNumber, pageSize}: GetMedia){
    return this.mediaService.getMedia(pageNumber, pageSize).pipe(
      tap(media => {
        const state = getState();
        console.log('media', media);
        setState({
          ...state,
          media: media,
          totalMedia: media ? media.length : 0
        });
      })
    );
  }

  @Action(GetMediaItem)
  getMediaItem({ getState, setState }: StateContext<MediaStateModel>, { id }: GetMediaItem) {
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
        let favorites = media.filter(x => x.isFavorite);
        setState({
          ...state,
          favorites: favorites,
          totalMedia: favorites ? favorites.length : 0
        });
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

  @Action(GetMetadata)
  async getMetadata({ getState, setState }: StateContext<MediaStateModel>) {
    this.metaDataService.getFinalData().then(resp => {
      const state = getState();
      setState({
        ...state,
        metadata: resp
      });      
    });
  }

  @Action(GetAllMediaItemFields)
  async getAllItemFields({ getState, setState }: StateContext<MediaStateModel>, {id}: GetAllMediaItemFields) {
    this.metaDataService.getFinalData().then(resp => {
      const state = getState();
      setState({
        ...state,
        allItemFields: resp
      });      
    });
  }

  @Action(GetMediaItemFields)
  async getItemFields({ getState, setState }: StateContext<MediaStateModel>, { id }: GetMediaItemFields) {
    this.metaDataService.getFinalData().then(resp => {
      const state = getState();
      let initialFields = resp.splice(0, 4);
      setState({
        ...state,
        itemFields: []
      });      
    });
  }

  @Action(AddMediaItemField)
  addItemField({ getState, setState }: StateContext<MediaStateModel>, { payload }: AddMediaItemField) {
    const state = getState();
    setState({
      ...state,
      itemFields: []
    });
    let itemFields = state.itemFields;
    itemFields.push(payload);
    setState({
      ...state,
      itemFields: itemFields
    });
  }

  @Action(RemoveMediaItemField)
  removeItemField({ getState, setState }: StateContext<MediaStateModel>, { id }: RemoveMediaItemField) {
    const state = getState();
    let itemFields = state.itemFields;
    itemFields = itemFields.filter(x => x.name !== id);
    setState({
      ...state,
      itemFields: itemFields
    })
  }
}
