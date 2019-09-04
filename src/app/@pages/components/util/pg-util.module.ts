import { NgModule } from '@angular/core';
import { pgDatePipe } from './pg-date.pipe';

@NgModule({
  declarations: [ pgDatePipe ],
  exports     : [ pgDatePipe ]
})
export class pgUtilModule {

}
