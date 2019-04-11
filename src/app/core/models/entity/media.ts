export class MediaItem {
  id: string;
  directoryId: number;
  directoryName: string;
  directoryParentId: number;
  directoryParentName: string;
  storageType: string;
  entityType: string;
  entityId: string;
  documentTypeCode?: string;  
  name: string;
  url: string;
  metadata?: any;
  contentType?: string;
  containerId?: string;
  size?: number;
  thumbnail: string;
  isDeleted?: boolean;
  status?: number;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedOnString?: string;
  modifiedBy?: string;

  type: string;
}
