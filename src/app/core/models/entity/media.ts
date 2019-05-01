import { Pagination } from './pagination';

export class Media {
  pagination: Pagination;
  data: MediaItem[];
}

export class MediaItem {
  id: any;
  documentId?: any;
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
  parentId?: number;
  hasChild?: boolean;
  isFavorite?: boolean;
  isChecked?: boolean;

  type: string;
  requester?: number;
  requestId?: number;
  requestType?: string;  
}
