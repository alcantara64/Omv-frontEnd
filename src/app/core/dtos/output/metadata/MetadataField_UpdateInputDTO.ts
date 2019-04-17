export interface MetadataField_UpdateInputDTO {
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