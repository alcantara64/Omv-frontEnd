import { BaseDTO } from '../../BaseDTO';

export class Document_SearchOutputDTO extends BaseDTO {
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

}
