import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataLists } from 'src/app/core/models/entity/metadata-list';

export class GetUploadHistory {
  static readonly type = '[Admin media] GetUploadHistory';
}

export class GetMetaDataFields {
  static readonly type = '[Admin media] GetMetaDataFields';
}

export class RemoveMetaDataFields {
  static readonly type = '[Admin media] RemoveMetaDataFields';
  constructor(public id: number) { }
}

export class CreateMetaDataField {
  static readonly type = '[Admin media] CreateMetaDataField';
  constructor(public payload: MetadataFields) { }
}


export class GetMetaDataLists {
  static readonly type = '[Admin media] GetMetaDataLists';
}

export class RemoveMetaDataList {
  static readonly type = '[Admin media] RemoveMetaDataList';
  constructor(public id: number) { }
}

export class CreateMetaDataList {
  static readonly type = '[Admin media] CreateMetaDataList';
  constructor(public payload: MetadataLists) { }
}