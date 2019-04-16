export class GetUploadHistory {
  static readonly type = '[Admin media] GetUploadHistory';
}

export class GetUploadRequest {
  static readonly type = '[Admin media] GetUploadRequest';

  constructor(public id: number) { }
}