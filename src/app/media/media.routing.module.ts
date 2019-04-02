import { MediaFavoritesComponent } from './media-favorites/media-favorites.component';
import { AllMediaComponent } from './all-media/all-media.component';
import { MediaComponent } from './media.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MediaStreamingArchiveComponent } from './media-streaming-archive/media-streaming-archive.component';

const mediaRoutes: Routes = [
  {
    path: 'media',
    component: MediaComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllMediaComponent },
      { path: 'favorites', component: MediaFavoritesComponent },
      { path: 'archive', component: MediaStreamingArchiveComponent }
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(mediaRoutes)
  ],
  exports: [RouterModule]
})
export class MediaRoutingModule { }