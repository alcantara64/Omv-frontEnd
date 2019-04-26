import { MetadataField_GetListItemByIdOutputDTO } from '../metadata/MetadataField_GetListItemByIdOutputDTO';

export class Filter_GetAllOutputDTO {
  MetadataFieldId: number;
  EntityId: string;
  EntityName: string;
  FieldName: string;
  MetadataListId: number;
  MetadataListName: string;
  FieldTypeId: number;
  IsFilterable?: boolean | null;
  Type: string;
  IsRequired: boolean;
  IsDeleted: boolean;
  RelatedField: number;
  Sort: number;
  Status: number;
  StatusName: string;
  Options: MetadataField_GetListItemByIdOutputDTO[];
}