export class MediaItem {
  id: string;
  storageType: string;
  entityType: string;
  entityId: string;
  documentTypeCode?: string;  
  name: string;
  url: string;
  metadata?: string;
  contentType?: string;
  containerId?: string;
  size?: number;
  thumbnail: string;
  isDeleted?: boolean;
  status?: number;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;

  type: string;
}
