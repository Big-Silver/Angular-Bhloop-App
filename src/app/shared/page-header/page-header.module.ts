import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header.component';
import { SharedModule } from '../../@pages/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    PageHeaderComponent
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderModule { }
