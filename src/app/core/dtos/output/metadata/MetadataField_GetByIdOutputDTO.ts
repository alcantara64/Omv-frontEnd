import { BaseDTO } from '../../BaseDTO';

export interface MetadataField_GetByIdOutputDTO extends BaseDTO {
    MetadataFieldId: number;
    FieldName: string;
    MetadataListId: number;
    FieldTypeId: number;
    IsRequired: boolean;
    IsDeleted: boolean;
    RelatedField: number;
    Sort: number;
    Status: number;
}