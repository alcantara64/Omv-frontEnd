import { GetHistory, GetMediaItem } from './media.action';
import { tap } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { MediaItem } from "../../../core/models/entity/media";
import { GetMedia as GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';

export class MediaStateModel {
  historyItems: any[];
  allMedia: MediaItem[];
  currentMediaItem: MediaItem;
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
    historyItems: [],
    allMedia: [],
    currentMediaItem: initialMediaItem
  }
})

export class MediaState {
  constructor(private mediaService: MediaService) { }

  @Selector()
  static getFavorites(state: MediaStateModel) {
    return state.allMedia.filter(x => x.isFavorite);
  }

  @Selector()
  static getHistory(state: MediaStateModel) {
    return state.historyItems;
  }

  @Selector()
  static getAll(state: MediaStateModel) {
    return state.allMedia;
  }

  @Selector()
  static getCurrentMediaItem(state: MediaStateModel) {
    return state.currentMediaItem;
  }

  @Action(GetHistory)
  getHistoryMedia({ getState, setState }: StateContext<MediaStateModel>, { id }: GetHistory) {
    return this.mediaService.getHistory(id).pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        historyItems: media
      });
    }));
  }

  @Action(GetMedia)
  getMedia({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaService.getMedia().pipe(
      tap(media => {
        const state = getState();
        setState({
          ...state,
          allMedia: media
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
}
