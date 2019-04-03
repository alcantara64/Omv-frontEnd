import { MediaRoutingModule } from './media.routing.module';
import { MediaComponent } from "../media/media.component";
import { AllMediaComponent } from "../media/all-media/all-media.component";
import { MediaStreamingArchiveComponent } from "../media/media-streaming-archive/media-streaming-archive.component";

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgxsModule } from '@ngxs/store';
import { MediaFavoritesComponent } from './media-favorites/media-favorites.component';
import { SharedModule } from '../shared/shared.module';
import { MediaUploadComponent } from './media-upload/media-upload.component';
import { TreeViewModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { MediaItemHistoryComponent } from './media-item/media-item-history/media-item-history.component';
import { MediaItemDetailsComponent } from './media-item/media-item-details/media-item-details.component';
import { MediaItemRelatedFilesComponent } from './media-item/media-item-related-files/media-item-related-files.component';
import { MediaItemComponent } from './media-item/media-item.component';

@NgModule({
	declarations: [	
		MediaComponent,
		AllMediaComponent,
		MediaStreamingArchiveComponent,
		MediaFavoritesComponent,
		MediaUploadComponent,
		MediaItemHistoryComponent,
		MediaItemDetailsComponent,
		MediaItemRelatedFilesComponent,
		MediaItemComponent
	],
  imports: [	
    SharedModule,
		MediaRoutingModule,
		TreeViewAllModule,
		TreeGridModule,
		NgxsModule.forFeature([
			
		])
	],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MediaModule {}
