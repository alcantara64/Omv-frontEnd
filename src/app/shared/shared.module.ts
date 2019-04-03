import { ListComponent } from './list/list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TileViewComponent } from '../shared/tile-view/tile-view.component';
import { TreeViewComponent } from '../shared/tree-view/tree-view.component';
import { MapViewComponent } from '../shared/map-view/map-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { ModalComponent } from './modal/modal.component';
import { EditComponent } from './edit/edit.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { AppHeaderComponent } from './app-header/app-header.component';
import { LeftNavComponent } from './leftnav/leftnav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AppHeaderComponent,
    LeftNavComponent,
    TabsComponent, 
    ListComponent,
    ModalComponent,
    EditComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent
  ],
  imports: [
    CommonModule,
    ListViewModule,
    GridAllModule,
    ButtonAllModule, 
    CheckBoxModule,
    RouterModule,
    GridAllModule,
    ListViewModule
  ],
  exports: [
    CommonModule,
    AppHeaderComponent,
    LeftNavComponent,
    PageNotFoundComponent,
    ListComponent,
    TabsComponent, 
    ModalComponent,
    EditComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }