export class UploadRequest {
    requesterName: string;
    source: string;
    destination: string;
    ruleId: number;
    ruleName: string;
    isOCRAllowed: boolean;
    isSRAllowed: boolean;
    size: string;
    files: string;
    iP: string;
    statusName: string;
    estProcessTime: string;
    createdOn: Date | string;
}