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
import { MediaFavoritesListviewComponent } from './media-favorites/media-favorites-listview/media-favorites-listview.component';
import { MediaState } from './state/media/media.state';
import {AdminUsersDataService} from "../core/services/data/admin-users/admin-users.data.service";
import {environment} from "../../environments/environment";
import {AdminUsersMockDataService} from "../core/services/data/admin-users/admin-users.mock.data.service";
import {AdminUsersWebDataService} from "../core/services/data/admin-users/admin-users.web.data.service";
import {MediaDataService} from "../core/services/data/media/media.data.service";
import {MediaMockDataService} from "../core/services/data/media/media.mock.data.service";

@NgModule({
	declarations: [
		MediaComponent,
		AllMediaComponent,
		MediaStreamingArchiveComponent,
		MediaFavoritesComponent,
		MediaFavoritesListviewComponent
	],
  imports: [
    SharedModule,
		MediaRoutingModule,
		NgxsModule.forFeature([
			MediaState
		])
	],
	providers: [
    { provide: MediaDataService, useClass: environment.useMocks ? MediaMockDataService : MediaMockDataService },
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MediaModule {}
