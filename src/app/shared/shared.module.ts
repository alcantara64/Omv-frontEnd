import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  declarations: [PageNotFoundComponent, EditComponent]
})
export class SharedModule { }
