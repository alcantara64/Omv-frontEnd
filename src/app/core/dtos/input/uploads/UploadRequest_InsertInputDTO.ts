export class UploadRequest_InsertInputDTO {
    UploadRequestId: number;
    UploadRequestType: number;
    Requester: number;
    DirectoryId: number
    DocumentId: string;
    StorageType: string;
    DocumentTypeCode: string;
    DocumentName: string;
    DocumentUrl: string;
    Metadata: string;
    ContentType: string;
    Size: number;
    ContainerId: string;
    ThumbnailContainerUrl: string;
    CreatedBy: string;
}