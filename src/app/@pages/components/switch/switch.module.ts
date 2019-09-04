import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { pgSwitchComponent } from './switch.component';

@NgModule({
  exports     : [ pgSwitchComponent ],
  declarations: [ pgSwitchComponent ],
  imports     : [ CommonModule ]
})
export class pgSwitchModule {
}
