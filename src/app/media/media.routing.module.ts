import { MediaItemHistoryComponent } from './media-item/media-item-history/media-item-history.component';
import { MediaItemRelatedFilesComponent } from './media-item/media-item-related-files/media-item-related-files.component';
import { MediaItemDetailsComponent } from './media-item/media-item-details/media-item-details.component';
import { MediaItemComponent } from './media-item/media-item.component';
import { MediaUploadComponent } from './media-upload/media-upload.component';
import { MediaFavoritesComponent } from './media-favorites/media-favorites.component';
import { AllMediaComponent } from './all-media/all-media.component';
import { MediaComponent } from './media.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MediaStreamingArchiveComponent } from './media-streaming-archive/media-streaming-archive.component';
import {MediaFavoritesListviewComponent} from "./media-favorites/media-favorites-listview/media-favorites-listview.component";
import { MediaFavoritesTileviewComponent } from './media-favorites/media-favorites-tileview/media-favorites-tileview.component';

const mediaRoutes: Routes = [
  {
    path: 'media',
    component: MediaComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full',data: { breadcrumb: 'Details'}, },
      { path: 'all', component: AllMediaComponent, data: { breadcrumb: 'All Media'},},
      { path: 'favorites', component: MediaFavoritesComponent, data: { breadcrumb: 'Favourites'},},
      { path: 'archive', component: MediaStreamingArchiveComponent, data: { breadcrumb: 'Streaming Archive'},},
      { path: 'favorites/all', component: MediaFavoritesTileviewComponent, data: { breadcrumb: 'Favourites All'},},
    ],
    data: { breadcrumb: 'Media'} 
  },
  {
    path: 'media/upload',
    component: MediaUploadComponent
  },
  {
    path: 'media/:id',
    component: MediaItemComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full',data: { breadcrumb: 'Details'} },
      { path: 'details', component: MediaItemDetailsComponent,data: { breadcrumb: 'Details'}},
      { path: 'related-items', component: MediaItemRelatedFilesComponent, data: { breadcrumb: 'Related Items'}},
      { path: 'history', component: MediaItemHistoryComponent, data: { breadcrumb: 'History'}},
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(mediaRoutes)
  ],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
