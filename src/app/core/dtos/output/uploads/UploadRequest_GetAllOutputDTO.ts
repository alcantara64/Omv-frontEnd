import { BaseDTO } from '../../BaseDTO';

export class UploadRequest_GetAllOutputDTO
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
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string;
    ModifiedBy: string;
}

