import { tap } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { Media } from "../../../core/models/entity/media";
import { GetFavorites, GetHistory } from './media.action';
import { Action, State, StateContext, Selector, } from '@ngxs/store';


export class MediaStateModel {
  favorites: Media[];
  historyItems: any[];
}

const initialGroup: Media = {
  id: 0,
  Type: null,
  Name: null,
  Date: null,
};

@State<MediaStateModel>({
  name: 'media',
  defaults: {
    favorites: [],
    historyItems: []
  }
})

export class MediaState {
  constructor(private mediaService: MediaService) { }

  @Selector()
  static getFavoriteMedia(state: MediaStateModel) {
    return state.favorites;
  }

  @Selector()
  static getHistoryMedia(state: MediaStateModel) {
    return state.historyItems;
  }

  @Action(GetFavorites)
  getFavoriteMedia({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaService.getMedia().pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        favorites: media
      });
    }));
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
}
