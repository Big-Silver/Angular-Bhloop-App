import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pgSelectModule } from '../select/select.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [ PaginationComponent ],
  exports     : [ PaginationComponent ],
  imports     : [ CommonModule, FormsModule, pgSelectModule ]
})

export class pgPaginationModule {
}
