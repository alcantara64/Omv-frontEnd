
export class GetFavorites {
  static readonly type = '[Media] GetFavorites';
}

export class GetHistory {
  static readonly type = '[Media] GetHistory';
  
  constructor(public id: number) { }
}