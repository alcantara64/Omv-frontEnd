export class GetMedia {
  static readonly type = '[Media] GetMedia';
}

export class GetMediaItem {
  static readonly type = '[Media] GetMediaItem';
  
  constructor(public id: number) { }
}

export class GetFavorites {
  static readonly type = '[Media] GetFavorites';
}

export class GetHistory {
  static readonly type = '[Media] GetHistory';
  
  constructor(public id: number) { }
}
