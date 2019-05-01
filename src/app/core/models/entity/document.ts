
export class Document {
    id: number;
    name: string;
    parentId?: number;
    hasChild?: boolean;
    directoryId?: number;
    documentId?: any;
    entityType: string;
    entityId: string;
    documentTypeCode: string;
    documentName: string;
    documentUrl: string;
    metadata: string;
    contentType: string;
    size?: number;
    thumbnailContainerUrl: string;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedOnString?: string;
    modifiedBy?: string;
}