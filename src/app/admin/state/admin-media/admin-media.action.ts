import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';

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
export class GetMetaDataList {
  static readonly type = '[Admin media] GetMetaDataList';
  constructor(public id: number) { }
}

export class RemoveMetaDataList {
  static readonly type = '[Admin media] RemoveMetaDataList';
  constructor(public id: number) { }
}
export class CreateMetaDataList {
  static readonly type = '[Admin media] CreateMetaDataList';
  constructor(public payload: MetadataList) { }
}
export class UpdateMetadataList {
  static readonly type = '[Admin media] UpdateMetadataList';
  constructor(public id: number, public payload: MetadataList) { }
}
export class DisableMetadataList {
  static readonly type = '[Admin media] DisableMetadataList';
  constructor(public id: number, public payload: MetadataList, public refreshList?: boolean) { }
}

export class EnableMetadataList {
  static readonly type = '[Admin media] EnableMetadataList';
  constructor(public id: number, public payload: MetadataList, public refreshList?: boolean) { }
}

export class SetCurrentMetadataList {
  static readonly type = '[Admin media] SetMetadataList';
  constructor(public payload: MetadataList) { }
}

export class SetCurrentMetadataListId {
  static readonly type = '[Admin media] SetMetadataListId';
  constructor(public id: number) { }
}

