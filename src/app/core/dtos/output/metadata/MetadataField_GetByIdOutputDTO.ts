export interface MetadataField_GetByIdOutputDTO {
    MetadataFieldId: number;
    FieldName: string;
    MetadataListId: number;
    FieldTypeId: number;
    IsRequired: boolean;
    IsDeleted: boolean;
    RelatedField: number;
    Sort: number;
    Status: number;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string;
    ModifiedBy: string;
}