import { BaseDTO } from '../../BaseDTO';

export class UploadRequest_GetAllOutputDTO extends BaseDTO
{
    UploadRequestId: number;
    UploadRequestType: number;
    Requester: number;
    Source: string;
    Destination: string;
    RuleId: number;
    RuleName: string;
    IsOCRAllowed: boolean;
    IsSRAllowed: boolean;
    Size: number;
    Files: string;
    IP: string;
    RequesterName: string;
    Status: number;
    StatusName: string; 
}
