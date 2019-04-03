import {tap} from "rxjs/operators";
import {MediaService} from "../../../core/services/business/media/media.service";
import {Media} from "../../../core/models/entity/media";
import { GetMedia } from './media.action';
import { Action, State, StateContext, Selector } from '@ngxs/store';


export class MediaStateModel {
  favorite: Media[];
}

const initialGroup: Media = {
  id: 0,
  Type: null,
  Name: null,
  Date: null,
};

@State<MediaStateModel>({
  name: 'media_favorite',
  defaults: {
    favorite: [],
  }
})

export class MediaState {
  constructor(private mediaFavoriteService: MediaService) {}

  @Selector()
  static getFavoriteMedia(state: MediaStateModel) {
    return state.favorite;
  }

  @Action(GetMedia)
  getFavoriteMedia({ getState, setState }: StateContext<MediaStateModel>) {
    return this.mediaFavoriteService.getMedia().pipe(tap(media => {
      const state = getState();
      setState({
        ...state,
        favorite: media
      });
    }));
  }
}
