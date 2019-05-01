import { Document_SearchParams } from './Document_SearchParams';

export class Document_SearchParamsInputDTO {
  PageNumber: number;
  Limit: number;
  Filters: Document_SearchParams[];
}