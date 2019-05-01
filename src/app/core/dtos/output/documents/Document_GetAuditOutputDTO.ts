export class Document_GetAuditOutputDTO {
    AuditId: string;
    EventName: string;
    EntityType: string;
    EntityId: string;
    ColumnName: string;
    OldValue: string;
    NewValue: string;
    CreatedOn: Date
    CreatedBy: string
}