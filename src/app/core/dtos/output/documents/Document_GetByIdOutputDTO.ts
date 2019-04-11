export class Document_GetByIdOutputDTO {
  DocumentId: any;
  DirectoryId: number;
  DiirectoryName: string;
  DirectoryParentId: number;
  DirectoryParentName: string;
  StorageType: string;
  EntityType: string;
  EntityId: string;
  DocumentTypeCode: string;
  DocumentName: string;
  DocumentUrl: string;
  Metadata: string;
  ContentType: string;
  Size?: number;
  ContainerId: string;
  ThumbnailContainerUrl: string;
  IsDeleted: boolean;
  Status: number;
}