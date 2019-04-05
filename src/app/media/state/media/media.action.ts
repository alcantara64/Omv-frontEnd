import { MediaItem } from 'src/app/core/models/entity/media';

export class GetMedia {
  static readonly type = '[Media] GetMedia';

  constructor(public pageNumber?: number , public pageSize?: number ) { }
}

export class GetMediaItem {
  static readonly type = '[Media] GetMediaItem';
  
  constructor(public id: number) { }
}

export class GetFavorites {
  static readonly type = '[Media] GetFavorites';
}

export class ToggleFavorite {
  static readonly type = '[Media] ToggleFavorite';

  constructor(public id: number, public payload: MediaItem) { }
}

export class GetHistory {
  static readonly type = '[Media] GetHistory';
  
  constructor(public id: number) { }
}
export class GetMediaTreeData {
  static readonly type = '[Media] GetMediaTreeData';

  constructor( ) { }
}