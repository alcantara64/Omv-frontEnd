import { MediaRoutingModule } from './media.routing.module';
import { MediaComponent } from "../media/media.component";
import { AllMediaComponent } from "../media/all-media/all-media.component";
import { MediaStreamingArchiveComponent } from "../media/media-streaming-archive/media-streaming-archive.component";

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgxsModule } from '@ngxs/store';
import { MediaFavoritesComponent } from './media-favorites/media-favorites.component';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { MediaFavoritesListviewComponent } from './media-favorites/media-favorites-listview/media-favorites-listview.component';
import { MediaState } from './state/media/media.state';
import { MediaUploadComponent } from './media-upload/media-upload.component';
import { TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { TreeGridModule, TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { MediaItemHistoryComponent } from './media-item/media-item-history/media-item-history.component';
import { MediaItemDetailsComponent } from './media-item/media-item-details/media-item-details.component';
import { MediaDataService } from "../core/services/data/media/media.data.service";
import { MediaMockDataService } from "../core/services/data/media/media.mock.data.service";
import { MediaItemRelatedFilesComponent } from './media-item/media-item-related-files/media-item-related-files.component';
import { MediaItemComponent } from './media-item/media-item.component';
import { AllMediaTileviewComponent } from './all-media/all-media-tileview/all-media-tileview.component';
import { AllMediaListviewComponent } from './all-media/all-media-listview/all-media-listview.component';
import { AllMediaTreeviewComponent } from './all-media/all-media-treeview/all-media-treeview.component';
import { AllMediaMapviewComponent } from './all-media/all-media-mapview/all-media-mapview.component';
import { MediaFavoritesMapviewComponent } from './media-favorites/media-favorites-mapview/media-favorites-mapview.component';
import { MediaFavoritesTreeviewComponent } from './media-favorites/media-favorites-treeview/media-favorites-treeview.component';
import { MediaFavoritesTileviewComponent } from './media-favorites/media-favorites-tileview/media-favorites-tileview.component';
import { PagerModule } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import {PdfViewerComponent} from "@syncfusion/ej2-angular-pdfviewer";
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DirectoryDataService } from '../core/services/data/directory/directory.data.service';
import { DirectoryMockDataService } from '../core/services/data/directory/directory.mock.data.service';
import { DirectoryWebDataService } from '../core/services/data/directory/directory.web.data.service';
import { MediaWebDataService } from '../core/services/data/media/media.web.data.service';
import { MetadataFieldsDataService } from '../core/services/data/metadata-fields/metadata-fields.data.service';
import { MetadataFieldsMockDataService } from '../core/services/data/metadata-fields/metadata-fields.mock.service';
import { MetadataFieldsWebDataService } from '../core/services/data/metadata-fields/metadata-fields.web.data.service';

@NgModule({
	declarations: [
		MediaComponent,
		AllMediaComponent,
		MediaStreamingArchiveComponent,
		MediaFavoritesComponent,
		MediaFavoritesListviewComponent,
		MediaFavoritesMapviewComponent,
		MediaFavoritesTileviewComponent,
		MediaFavoritesTreeviewComponent,
		MediaUploadComponent,
		MediaItemHistoryComponent,
		MediaItemDetailsComponent,
		MediaItemRelatedFilesComponent,
		MediaItemComponent,
		AllMediaTileviewComponent,
		AllMediaListviewComponent,
		AllMediaTreeviewComponent,
		AllMediaMapviewComponent,
		MediaFavoritesTileviewComponent
	],
	imports: [
		PagerModule,
		SharedModule,
		MediaRoutingModule,
		TreeViewAllModule,
		TreeGridAllModule,
		CheckBoxModule,
		DialogModule,
		DropDownListModule,
		ListViewModule,
		NgxsModule.forFeature([
			MediaState
		])
	],
	providers: [
		{ provide: MediaDataService, useClass: environment.useMocks ? MediaMockDataService : MediaWebDataService },		
		{ provide: DirectoryDataService, useClass: environment.useMocks ? DirectoryMockDataService : DirectoryWebDataService },		
    { provide: MetadataFieldsDataService, useClass: environment.useMocks ? MetadataFieldsMockDataService : MetadataFieldsWebDataService },
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MediaModule { }
