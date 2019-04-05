import { GetHistory, GetMediaItem, GetFavorites, ToggleFavorite, GetMediaTreeData, GetMetadata } from './media.action';
import { tap } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { MediaItem } from "../../../core/models/entity/media";
import { GetMedia as GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { MediaTreeGrid } from 'src/app/core/models/media-tree-grid';
import { AdminMediaAccessService } from 'src/app/core/services/business/admin-media-access/admin-media-access.service';
import { MetadataService } from 'src/app/shared/dynamic-components/metadata.service';

export class MediaStateModel {
  media: MediaItem[];
  favorites: MediaItem[];
  currentMediaItem: MediaItem;
  historyItems: any[];
  metadata: any[];
  totalMedia: number;
  mediaTreeData: MediaTreeGrid[];
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
    metadata: []
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

  constructor(private mediaService: MediaService, private adminMediaService: AdminMediaAccessService, private metaDataService: MetadataService) { }
  
  @Selector()
  static getMediaTreeData(state: MediaStateModel) {
    return state.mediaTreeData;
  }
  

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
    return await this.metaDataService.getMetadata().then(
      data => {
        const state = getState();
        setState({
          ...state,
          metadata: data
        });
      }
    );
  }
}
