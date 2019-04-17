import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';

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

export class GetNewUploads{
  static readonly type = '[Admin media] GetNewUploads';
}
export class GetUploadRequest {
  static readonly type = '[Admin media] GetUploadRequest';

  constructor(public id: number) { }
}
