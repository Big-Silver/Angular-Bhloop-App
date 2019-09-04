import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pgOptionComponent } from './option.component';
import { OptionPipe } from './option.pipe';
import { pgSelectComponent } from './select.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule ],
  declarations: [ OptionPipe, pgOptionComponent, pgSelectComponent ],
  exports     : [ OptionPipe, pgOptionComponent, pgSelectComponent ]
})
export class pgSelectModule {
}
