export class UploadRequest_GetByIdOutputDTO
{
    RequesterName: string;
    Source: string;
    Destination: string;
    RuleId: number;
    RuleName: string;
    IsOCRAllowed: boolean;
    IsSRAllowed: boolean;
    Size: string;
    Files: string;
    IP: string;
    StatusName: string;
    EstProcessTime: string;
    CreatedOn: Date | string;
}