import { MediaRoutingModule } from './media.routing.module';
import { MediaComponent } from "../media/media.component";
import { AllMediaComponent } from "../media/all-media/all-media.component";
import { MediaStreamingArchiveComponent } from "../media/media-streaming-archive/media-streaming-archive.component";

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TabsComponent } from "../shared/tabs/tabs.component";
import { ListComponent } from "../shared/list/list.component";
import { NgxsModule } from '@ngxs/store';
import { MediaFavoritesComponent } from './media-favorites/media-favorites.component';
import { SharedModule } from '../shared/shared.module';
import { MediaDataService } from '../core/services/data/media/media.data.service';
import { environment } from 'src/environments/environment';
import { MediaMockService } from '../core/services/data/media/media.mock.service';
import { MediaWebDataService } from '../core/services/data/media/media.web.service';

@NgModule({
	declarations: [
		MediaComponent,
		AllMediaComponent,
		MediaStreamingArchiveComponent,
		MediaFavoritesComponent
	],
	imports: [
		SharedModule,
		MediaRoutingModule,
		NgxsModule.forFeature([

		])
	],
	providers: [
		{ provide: MediaDataService, useClass: environment.useMocks ? MediaMockService : MediaWebDataService }
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MediaModule { }
