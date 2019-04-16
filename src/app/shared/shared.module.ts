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
import { AppHeaderComponent } from './app-header/app-header.component';
import { LeftNavComponent } from './leftnav/leftnav.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import * as pdfViewerComponent  from './pdf-viewer/pdf-viewer.component';
import { MediaViewerComponent } from './media-viewer/media-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FormInputComponent } from './dynamic-components/components/form-input.component';
import { FormSelectComponent } from './dynamic-components/components/form-select.component';
import { DynamicFormComponent } from './dynamic-components/components/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-components/directives/dynamic-field.directive';
import { FormDateComponent } from './dynamic-components/components/form-date.component';
import { FormLabelComponent } from './dynamic-components/components/form-label.component';
import { FileSizePipe } from '../core/pipes/file-size/file-size.pipe';
import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ImagePreloadDirective } from '../core/directives/image-preload/image-preload.directive';
import { ListViewModule } from '@syncfusion/ej2-angular-lists/src/list-view/listview.module';
import { GridModule } from '@syncfusion/ej2-angular-grids/src/grid/grid.module';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons/src/button/button.module';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons/src/check-box/checkbox.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups/src/dialog/dialog.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars/src/datepicker/datepicker.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns/src/drop-down-list/dropdownlist.module';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations/src/toolbar/toolbar.module';
import { TooltipModule } from '@syncfusion/ej2-angular-popups/src/tooltip/tooltip.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations/src/treeview/treeview.module';
import { TreeGridModule, TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';

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
		TreeGridAllModule,
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
