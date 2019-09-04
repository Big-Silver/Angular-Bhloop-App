import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pgTagComponent } from './tag.component';
import { pgTagControl } from './tag.control.component';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  declarations: [
    pgTagControl,pgTagComponent
  ],
  exports     : [
    pgTagControl,pgTagComponent
  ]
})
export class pgTagModule {
}
