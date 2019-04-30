import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';
import { MetadataList } from 'src/app/core/models/entity/metadata-list';
import { MetadataListItem } from 'src/app/core/models/entity/metadata-list-item';
import { MetadataDetail } from 'src/app/core/models/entity/metadata-detail';
import { UploadHistory } from 'src/app/core/models/entity/uploadhistory';

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
export class GetMetaDataListsItem {
  static readonly type = '[Admin media] GetMetaDataListItem';
}
export class GetMetaDataListsItemById {
  static readonly type = '[Admin media] GetMetaDataListItem';
  constructor(public id: number){}
}
export class GetMetaDataList {
  static readonly type = '[Admin media] GetMetaDataList';
  constructor(public id: number) { }
}

export class RemoveMetaDataList {
  static readonly type = '[Admin media] RemoveMetaDataList';
  constructor(public id: number) { }
}

export class RemoveMetaDataListItem {
  static readonly type = '[Admin media] RemoveMetaDataListItem';
  constructor(public id: number, public metadataListItemId: number) { }
}
export class CreateMetaDataList {
  static readonly type = '[Admin media] CreateMetaDataList';
  constructor(public payload: MetadataList) { }
}

export class CreateMetaDataListItem {
  static readonly type = '[Admin media] CreateMetaDataListItem';
  constructor(public id:number, public payload: MetadataListItem) { }
}
export class UpdateMetadataList {
  static readonly type = '[Admin media] UpdateMetadataList';
  constructor(public id: number, public payload: MetadataList) { }
}

export class UpdateMetadataListItem {
  static readonly type = '[Admin media] UpdateMetadataList';
  constructor(public id: number, public payload: MetadataDetail) { }
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

export class GetMetaDataDetailById {
  static readonly type = '[Admin media] GetMetaDataDetailById';
  constructor(public id: number){}
}

export class GetNewUploads {
  static readonly type = '[Admin media] GetNewUploads';
}
export class GetUploadRequest {
  static readonly type = '[Admin media] GetUploadRequest';

  constructor(public id: number) { }
}

export class ApproveUploads {
  static readonly type = '[Admin Groups] ApproveUploads';

  constructor(public id: number, public refreshList?: boolean) { }
}

export class RejectUploads {
  static readonly type = '[Admin Groups] RejectUploads';

  constructor(public id: number, public refreshList?: boolean) { }
}

export class UpdateMetaDataField {
  static readonly type = '[Admin media] UpdateMetaDataField';
  constructor(public id: number, public payload: MetadataFields, public hideMetadalistName? : boolean) { }
}

export class GetMetadataListById{
  static readonly type= '[Admin media] GetMetadataListById';
  constructor(public id: number) { }
}

export class GetFieldTypes{
  static readonly type = '[Admin media] GetFieldTypes';
  
}

