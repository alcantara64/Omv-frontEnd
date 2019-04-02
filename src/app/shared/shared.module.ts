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

@NgModule({
  imports: [
    CommonModule,
    ListViewModule,
    GridAllModule,
    ButtonAllModule, 
    CheckBoxModule
  ],
  exports: [
    CommonModule,
    PageNotFoundComponent,
    ListComponent,
    TabsComponent, 
    ModalComponent,
    EditComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent
  ],
  declarations: [
    PageNotFoundComponent,
    TabsComponent, 
    ListComponent,
    ModalComponent,
    EditComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }
