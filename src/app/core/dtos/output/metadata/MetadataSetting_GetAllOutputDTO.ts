import { MetadataField_GetListItemByIdOutputDTO } from './MetadataField_GetListItemByIdOutputDTO';

export class MetadataSetting_GetAllOutputDTO {
  MetadataSettingId: number;
  MetadataFieldId: number;
  FieldName: string;
  MetadataListId: number;
  MetadataListName: string;
  FieldTypeId: number;
  FieldTypeName: string;
  EntityId: string;
  EntityName: string;
  IsRequired: boolean;
  Order: number;
  Status: number;
  Options: MetadataField_GetListItemByIdOutputDTO[];
}