import { MetadataFields } from 'src/app/core/models/entity/metadata-fields';

export class GetUploadHistory {
  static readonly type = '[Admin media] GetUploadHistory';
}

export class GetUploadRequest {
  static readonly type = '[Admin media] GetUploadRequest';

  constructor(public id: number) { }
}

export class GetMetaDataFields {
  static readonly type = '[Admin media] GetMetaDataFields';
}

export class RemoveMetaDataFields {
  static readonly type = '[Admin media] RemoveMetaDataFields';
  constructor(public id: number) { }
}