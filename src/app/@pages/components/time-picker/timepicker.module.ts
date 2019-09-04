import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { pgTimePickerInnerComponent } from './timepicker-inner.component';
import { pgTimePickerComponent } from './timepicker.component';
import { pgUtilModule } from '../util/pg-util.module';
@NgModule({
  imports     : [ CommonModule, OverlayModule,pgUtilModule ],
  declarations: [ pgTimePickerComponent, pgTimePickerInnerComponent ],
  exports     : [ pgTimePickerComponent, pgTimePickerInnerComponent ]
})
export class pgTimePickerModule {
}
