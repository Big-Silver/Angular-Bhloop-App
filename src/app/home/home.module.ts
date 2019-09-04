import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PageHeaderModule } from '../shared/page-header/page-header.module';
import { SharedModule } from '../@pages/components/shared.module';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InstructorService } from './service/instructor/instructor.service';
import { pgListViewModule } from '../@pages/components/list-view/list-view.module';
import { DaysAgoPipe } from './pipes/days-ago.pipe';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ModalModule } from 'ngx-bootstrap';
import { pgSelectModule } from '../@pages/components/select/select.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    SharedModule,
    PerfectScrollbarModule,
    pgListViewModule,
    ModalModule.forRoot(),
    ContextMenuModule.forRoot(),
    pgSelectModule
  ],
  declarations: [
    HomeComponent,
    DaysAgoPipe
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    InstructorService
  ]
})
export class HomeModule { }
