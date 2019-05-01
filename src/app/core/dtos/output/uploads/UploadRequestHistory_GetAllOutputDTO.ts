import { BaseDTO } from '../../BaseDTO';

export class UploadRequestHistory_GetAllOutputDTO extends BaseDTO {
    UploadRequestHistoryId: number;
    UploadRequestId: number;
    Status: number;
}
