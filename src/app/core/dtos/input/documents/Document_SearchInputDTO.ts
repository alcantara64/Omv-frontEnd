export class Document_SearchInputDTO {
  DocumentId: any;
  EntityType: string;
  EntityId: string;
  DocumentName: string;
  Metadata: string;
  ContentType: string;
  Status?: number;
  ModifiedBy: string;
  PageNumber: number;
  Limit: number;
}