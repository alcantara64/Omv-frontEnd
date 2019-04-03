import { tap } from "rxjs/operators";
import { MediaService } from "../../../core/services/business/media/media.service";
import { Media } from "../../../core/models/entity/media";
import { GetMedia, GetAllMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { MediaTileView } from 'src/app/core/models/media';


export class MediaStateModel {
  favorites: Media[];
  allMedia: MediaTileView[];
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
    allMedia: []
  }
})

export class MediaState {
  constructor(private mediaService: MediaService) { }

  @Selector()
  static getFavoriteMedia(state: MediaStateModel) {
    return state.favorites;
  }

  @Selector()
  static getAllMedia(state: MediaStateModel) {
    return state.allMedia;
  }

  @Action(GetMedia)
  getFavoriteMedia({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaService.getMedia().pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        favorites: media
      });
    }));
  }

  @Action(GetAllMedia)
  getAllMedia({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaService.getAllMedia().pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        allMedia: media
      });
    }));
  }
}
