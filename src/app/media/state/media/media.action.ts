import { MediaItem } from 'src/app/core/models/entity/media';

export class GetMedia {
  static readonly type = '[Media] GetMedia';

  constructor(public pageNumber?: number, public pageSize?: number) { }
}

export class GetMediaItem {
  static readonly type = '[Media] GetMediaItem';
}
export class GetMediaItemDetails {
  static readonly type = '[Media] GetMediaItemDetails';
  
  constructor(public id: number) { }
}

export class SetCurrentMediaItemId {
  static readonly type = '[Media] SetCurrentMediaItemId';
  
  constructor(public id: string) { }
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
export class SetMediaId {
  static readonly type = '[Media] GetMediaId';

  constructor(public id: string) { }
}

export class GetMediaTreeData {
  static readonly type = '[Media] GetMediaTreeData';

  constructor( ) { }
}

export class GetDirectories {
  static readonly type = '[Media] GetDirectories';
  
  constructor() { }
}

export class GetMetadata {
  static readonly type = '[Media] GetMetadata';
  
  constructor(public id: number) { }
}

export class GetDirectoryMetadata {
  static readonly type = '[Media] GetDirectoryMetadata';
  
  constructor(public id: number) { }
}

export class GetItemMetadata {
  static readonly type = '[Media] GetItemMetadata';
  
  constructor(public id: number) { }
}

export class AddMediaItemField {
  static readonly type = '[Media] AddMediaItemField';
  
  constructor(public payload: any) { }
}

export class RemoveMediaItemField {
  static readonly type = '[Media] RemoveMediaItemField';
  
  constructor(public name: string) { }
}
