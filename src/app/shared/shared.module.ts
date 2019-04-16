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
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AppHeaderComponent } from './app-header/app-header.component';
import { LeftNavComponent } from './leftnav/leftnav.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import * as pdfViewerComponent  from './pdf-viewer/pdf-viewer.component';
import { PdfViewerAltComponent } from './pdf-viewer-alt/pdf-viewer-alt.component';
import { MediaViewerComponent } from './media-viewer/media-viewer.component';
import  { PdfViewerModule} from "@syncfusion/ej2-angular-pdfviewer";
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FormInputComponent } from './dynamic-components/components/form-input.component';
import { FormSelectComponent } from './dynamic-components/components/form-select.component';
import { DynamicFormComponent } from './dynamic-components/components/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-components/directives/dynamic-field.directive';
import { FormDateComponent } from './dynamic-components/components/form-date.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import {DialogModule, TooltipModule} from '@syncfusion/ej2-angular-popups';
import { FormLabelComponent } from './dynamic-components/components/form-label.component';
import { FileSizePipe } from '../core/pipes/file-size/file-size.pipe';
import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {ToolbarModule, TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import { ImagePreloadDirective } from '../core/directives/image-preload/image-preload.directive';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AppHeaderComponent,
    BreadcrumbComponent,
    LeftNavComponent,
    TabsComponent, 
    ListComponent,
    ModalComponent,
    EditComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent,
    BreadcrumbComponent,
    pdfViewerComponent.PdfViewerComponent,
    PdfViewerComponent,
    PdfViewerAltComponent,
    MediaViewerComponent,
    FileSizePipe,
    FormInputComponent,
    FormLabelComponent,
    FormSelectComponent,
    FormDateComponent,
    DynamicFormComponent,    
    DynamicFieldDirective, 
    ImagePreloadDirective,
  ],
  imports: [
    CommonModule,
    ListViewModule,
    GridModule,
    ButtonModule, 
    CheckBoxModule,
    DialogModule,
    RouterModule,
    GridModule,
    ListViewModule,
    DatePickerModule,
    DropDownListModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    ImageViewerModule,
    PdfViewerModule,
    ToolbarModule,
    DialogModule,
    TooltipModule,
    TreeViewModule,
    TreeGridModule
  ],
  exports: [
    CommonModule,
    AppHeaderComponent,
    BreadcrumbComponent,
    LeftNavComponent,
    PageNotFoundComponent,
    ListComponent,
    TabsComponent,
    ModalComponent,
    EditComponent,
    MapViewComponent,
    TreeViewComponent,
    TileViewComponent,
    DynamicFormComponent,
    FileSizePipe,
    FormInputComponent,
    FormLabelComponent,
    FormSelectComponent,
    FormDateComponent,
    PdfViewerComponent,
    DynamicFieldDirective,
    ImagePreloadDirective
  ],
  entryComponents: [
    FormDateComponent,
    FormInputComponent,
    FormLabelComponent,
    FormSelectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }
