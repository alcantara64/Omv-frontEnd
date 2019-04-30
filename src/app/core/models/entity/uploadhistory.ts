export class UploadHistory {
  id: number;
  uploadRequestId: number;
  uploadRequestType: number;
  requester: number;
  directoryId?: number;
  source: string;
  destination: string;
  ruleId: number;
  ruleName: string;
  isOCRAllowed: boolean;
  isSRAllowed: boolean;
  size: number;
  sizeDisplay?: string;
  files: string;
  iP: string;
  requesterName: string;
  status: number;
  statusName?: string;    
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date ;
  modifiedBy?: string;
  modifiedOnString?: string;
}

