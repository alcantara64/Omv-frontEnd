import { MediaItem } from 'src/app/core/models/entity/media';
import { Tag } from 'src/app/core/models/entity/tag';

export class GetMedia {
  static readonly type = '[Media] GetMedia';

  constructor(public pageNumber?: number, public pageSize?: number) { }
}

export class GetTreeViewMedia{
  static readonly type = '[Media] GetTreeViewMedia';

  constructor(public pageNumber?: number, public pageSize?: number) { }
}

export class GetMediaItem {
  static readonly type = '[Media] GetMediaItem';
  
  constructor(public id: any) { }
}

export class ClearMediaItemMetadata {
  static readonly type = '[Media] ClearMediaItemMetadata';
}

export class ClearDirectoryMetadata {
  static readonly type = '[Media] ClearDirectoryMetadata';
}

export class ResetUploadStatus {
  static readonly type = '[Media] ResetUploadStatus';
}

export class UpdateMediaItem {
  static readonly type = '[Media] UpdateMediaItem';
  
  constructor(public id: any, public payload: MediaItem) { }
}

export class CreateMediaItem {
  static readonly type = '[Media] CreateMediaItem';
  
  constructor(public payload: MediaItem) { }
}

export class GetMediaItemDetails {
  static readonly type = '[Media] GetMediaItemDetails';
  
  constructor(public id: any) { }
}

export class SetCurrentMediaItemId {
  static readonly type = '[Media] SetCurrentMediaItemId';
  
  constructor(public id: any) { }
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

  constructor(public id: any) { }
}

export class GetMediaTreeData {
  static readonly type = '[Media] GetMediaTreeData';

  constructor( ) { }
}

export class GetDirectories {
  static readonly type = '[Media] GetDirectories';
  
  constructor() { }
}

export class GetDirectoryMetadata {
  static readonly type = '[Media] GetDirectoryMetadata';
  
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

export class SetSelectedItems {
  static readonly type = '[Media] SetSelectedItems';

  constructor(public selectedItems: any[]) {}
}

export class GetFilterFields {
  static readonly type = '[Media] GetFilterFields';
}

export class AddFilterTag {
  static readonly type = '[Media] AddFilterTag';

  constructor(public name: string, public value: any) { }
}

export class RemoveFilterTag {
  static readonly type = '[Media] RemoveFilterTag';

  constructor(public name: string, public value: any) { }
}

export class ClearFilterTags {
  static readonly type = '[Media] ClearFilterTags';
}

export class ShowFilters {
  static readonly type = '[Media] ShowFilters';
}

export class HideFilters {
  static readonly type = '[Media] HideFilters';
}

export class ApplyFilters {
  static readonly type = '[Media] ApplyFilters';

  constructor(public pageNumber: number = 1, public pageSize: number = 25) { }
}