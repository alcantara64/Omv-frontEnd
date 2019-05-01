import { HttpClient } from '@angular/common/http';
import { FiltersDataService } from './filters.data.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Metadata } from 'src/app/core/models/entity/metadata';
import { environment } from 'src/environments/environment';
import { MetadataSetting_GetAllOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataSetting_GetAllOutputDTO';
import { catchError, map } from 'rxjs/operators';
import * as automapper from 'automapper-ts';
import { Filter_GetAllOutputDTO } from 'src/app/core/dtos/output/filters/Filter_GetAllOutputDTO';
import { MetadataField_GetListItemByIdOutputDTO } from 'src/app/core/dtos/output/metadata/MetadataField_GetListItemByIdOutputDTO';
import { ListItem } from 'src/app/core/models/entity/list-item';
import { Media, MediaItem } from 'src/app/core/models/entity/media';
import { Document_SearchOutputDTO, Document_SearchOutputData } from 'src/app/core/dtos/output/documents/Document_SearchOutputDTO';
import { Tag } from 'src/app/core/models/entity/tag';
import { Document_SearchParamsInputDTO } from 'src/app/core/dtos/input/documents/Document_SearchParamsInputDTO';
import { Document_SearchParams } from 'src/app/core/dtos/input/documents/Document_SearchParams';

@Injectable({
  providedIn: 'root'
})
export class FiltersWebDataService implements FiltersDataService {

  constructor(private httpClient: HttpClient) { }

  getFilters(): Observable<Metadata[]> {
    var requestUri = environment.api.baseUrl + `/v1/filters`;

    return this.httpClient.get<Filter_GetAllOutputDTO[]>(requestUri).pipe(
      map(response => {
        // map filters
        automapper
          .createMap(Filter_GetAllOutputDTO, Metadata)
          .forMember('name', function (opts) { opts.mapFrom('fieldName'); })
          .forMember('listName', function (opts) { opts.mapFrom('metadataListName'); })
          .forMember('type', function (opts) { opts.mapFrom('type'); })
          .forMember('isRequired', function (opts) { opts.mapFrom('isRequired'); })
          .forMember('order', function (opts) { opts.mapFrom('sort'); })
          .forMember('type', function (opts) { opts.mapFrom('type'); })
          .forMember('options', function (opts) { opts.mapFrom('options'); });

        let filters: Metadata[] = automapper.map(Filter_GetAllOutputDTO, Metadata, response);

        // map filter options
        filters.forEach(filter => {
          automapper
            .createMap(MetadataField_GetListItemByIdOutputDTO, ListItem)
            .forMember('value', function (opts) { opts.mapFrom('itemValue'); })
            .forMember('description', function (opts) { opts.mapFrom('itemDescription'); })
            .forMember('sort', function (opts) { opts.mapFrom('itemSort'); })
            .forMember('isSelected', function (opts) { false });

            let options: ListItem[] = automapper.map(MetadataField_GetListItemByIdOutputDTO, ListItem, filter.options);
            filter.options = options;
        });

        console.log('FiltersWebDataService - getFilters: ', filters);
        return filters;
      })
    );
  }

  applyFilters(filters: Tag[], pageNumber?: number, pageSize?: number): Observable<Media> {
    var requestUri = environment.api.baseUrl + `/v1/documents/filter`;

    automapper
      .createMap(Tag, Document_SearchParams)
      .forMember('fieldName', function (opts) { opts.mapFrom('name'); })
      .forMember('value', function (opts) { opts.mapFrom('value'); })
      .forMember('isMetaColumn', function () { return true; });

    const searchParams = automapper.map(Tag, Document_SearchParams, filters);

    let payload = new Document_SearchParamsInputDTO();
    payload.PageNumber = pageNumber;
    payload.Limit = pageSize;
    payload.Filters = searchParams;

    return this.httpClient.post<Document_SearchOutputDTO>(requestUri, payload).pipe(map(
      response => {
        // Map media
        automapper
          .createMap(Document_SearchOutputDTO, Media)
          .forMember('pagination', function(opts) { opts.mapFrom('Pagination'); })
          .forMember('data', function(opts) { opts.mapFrom('Data'); });

        let media: Media = automapper.map(Document_SearchOutputDTO, Media, response);
        console.log('FiltersWebDataService - applyFilters media: ', media);

        // Map media items
        automapper
          .createMap(Document_SearchOutputData, MediaItem)
          .forMember('id', function (opts) { return 1; })
          .forMember('documentId', function (opts) { opts.mapFrom('documentId'); })
          .forMember('entityType', function (opts) { opts.mapFrom('EntityType'); })
          .forMember('entityId', function (opts) { opts.mapFrom('EntityId'); })
          .forMember('directoryId', function (opts) { opts.mapFrom('DirectoryId'); })
          .forMember('documentTypeCode', function (opts) { opts.mapFrom('DocumentTypeCode'); })
          .forMember('name', function (opts) { opts.mapFrom('name'); })
          .forMember('url', function (opts) { opts.mapFrom('documentUrl'); })
          .forMember('metadata', function (opts) { opts.mapFrom('Metadata'); })
          .forMember('contentType', function (opts) { opts.mapFrom('ContentType'); })
          .forMember('containerId', function (opts) { opts.mapFrom('ContainerId'); })
          .forMember('hasChild', function(opts) { opts.mapFrom('hasChild'); })
          .forMember('size', function (opts) { opts.mapFrom('Size'); })
          .forMember('thumbnail', function (opts) { opts.mapFrom('thumbnailContainerUrl'); })
          .forMember('isDeleted', function (opts) { opts.mapFrom('IsDeleted'); })
          .forMember('status', function (opts) { opts.mapFrom('Status'); })
          .forMember('parentId', function (opts) { opts.mapFrom('parentId'); })
          .forMember('createdOn', function (opts) { opts.mapFrom('createdOn'); })
          .forMember('createdBy', function (opts) { opts.mapFrom('createdBy'); })
          .forMember('modifiedOn', function (opts) { opts.mapFrom('modifiedOn'); })
          .forMember('modifiedBy', function (opts) { opts.mapFrom('modifiedBy'); });

        let mediaItems = automapper.map(Document_SearchOutputData, MediaItem, media.data);
        
        mediaItems.forEach(resp => {
          if (!resp.thumbnail) {
            switch (resp.documentTypeCode) {
              case 'PDF':
                resp.thumbnail = 'https://haywardgordon.com/wp-content/themes/HaywardGordon/assets/pdf-icon.jpg';
                break;
              case 'DOCX':
              case 'DOC':
                resp.thumbnail = 'https://vacanegra.com/wp-content/plugins/widgetkit/assets/images/file.svg';
                break;
              case 'JPG':
              case 'PNG':
              case 'JPEG':
              case 'GIF':
                resp.thumbnail = 'https://i1.wp.com/thefrontline.org.uk/wp-content/uploads/2018/10/placeholder.jpg?ssl=1';
                break;
            }
          }
          if (resp.parentId === 0) resp.parentId = null;
          resp.type = resp.documentTypeCode;
        });
        mediaItems.sort((a, b) => new Date(b.modifiedOn).getTime() - new Date(a.modifiedOn).getTime());
        media.data = mediaItems;

        console.log('FiltersWebDataService - applyFilters: ', media);
        return media;
      })
    );
  }
}