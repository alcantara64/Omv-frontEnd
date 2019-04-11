export class UploadRequest_InsertInputDTO {
  UploadRequestId?: number;
  Requester: number;
  DirectoryId: number;
  DocumentId: any;
  DocumentTypeCode: string;
  DocumentName: string;
  DocumentUrl: string;
  Metadata: string;
  ContentType: string;
  Size?: number;
  ContainerId: string;
  ThumbnailContainerUrl: string;
}