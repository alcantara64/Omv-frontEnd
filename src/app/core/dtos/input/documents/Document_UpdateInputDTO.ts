export class Document_UpdateInputDTO {
  StorageType: string;
  EntityType: string;
  EntityId: string;
  DocumentTypeCode: string;
  DocumentName: string;
  DocumentUrl: string;
  Metadata: string;
  ContentType: string;
  Size: number;
  ContainerId: string;
  ThumbnailContainerUrl: string;
  IsDeleted: boolean;
  Status: number;
}