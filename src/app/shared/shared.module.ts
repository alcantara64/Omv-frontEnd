import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TileViewComponent } from '../shared/tile-view/tile-view.component';
import { TreeViewComponent } from '../shared/tree-view/tree-view.component';
import { MapViewComponent } from '../shared/map-view/map-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  declarations: [PageNotFoundComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent]
})
export class SharedModule { }
