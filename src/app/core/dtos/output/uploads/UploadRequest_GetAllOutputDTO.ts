import { BaseDTO } from '../../BaseDTO';

export class UploadRequest_GetAllOutputDTO extends BaseDTO{
    UploadRequestId: number;
    UploadRequestType: number;
    Requester: number;
    DirectoryId: number;
    RequesterName: string;
    Size: number;
    ContainerId: string;
    ContentType: string;
    DocumentName: string;
    DocumentTypeCode: string;
    DocumentUrl: string;
    Metadata: string;
    Status: number;
    StatusName: string;
    Files: number;
}

