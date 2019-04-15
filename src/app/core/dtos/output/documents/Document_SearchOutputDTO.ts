import { BaseDTO } from '../../BaseDTO';
import { PaginationInfo } from '../PaginationInfo';

export class Document_SearchOutputDTO {
  Pagination: PaginationInfo;
  Data: Document_SearchOutputData[];
}

export class Document_SearchOutputData extends BaseDTO {
  Id: number;
  Name: string;
  ParentId?: number;
  HasChild?: boolean;
  DirectoryId?: number;
  DocumentId?: any;
  EntityType: string;
  EntityId: string;
  DocumentTypeCode: string;
  DocumentName: string;
  DocumentUrl: string;
  Metadata: string;
  ContentType: string;
  Size?: number;
  ThumbnailContainerUrl: string;
  Status?: number;
  IsFavorite: boolean;
}
