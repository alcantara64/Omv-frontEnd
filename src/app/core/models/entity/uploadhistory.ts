export class UploadHistory {
  id: number;
  uploadRequestType: number;
  requester: number;
  directoryId: number;
  requesterName: string;
  status: number;
  statusName?: string;
  size: string;
  containerId: number;
  contentType: string;
  documentName: string;
  documentTypeCode: string;
  documentUrl: string;
  metadata: string; 
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedOnString?: string;
  modifiedBy?: string;

}
