
export class Document_SearchOutputDTO {
  DocumentId: any;
  StorageType: string;
  EntityType: string;
  EntityId: string;
  DocumentTypeCode: string;
  DocumentName: string;
  DocumentUrl: string;
  Metadata: string;
  ContentType: string;
  ContainerId: string;
  Size?: number;
  ThumbnailContainerUrl: string;
  IsDeleted: boolean;
  Status?: number;
  CreatedOn: Date;
  CreatedBy: string;
  ModifiedOn: Date;
  ModifiedBy: string;
}