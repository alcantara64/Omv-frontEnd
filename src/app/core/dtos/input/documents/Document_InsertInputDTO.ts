export class Document_InsertInputDTO {
  DocumentId: any;
  StorageType: string;
  EntityType: string;
  EntityId: string;
  DirectoryId: number;
  DocumentTypeCode: string;
  DocumentName: string;
  DocumentUrl: string;
  Metadata: string;
  ContentType: string;
  Size?: number;
  ContainerId: string;
  ThumbnailContainerUrl: string;
  IsDeleted?: boolean;
  Status: number;
}