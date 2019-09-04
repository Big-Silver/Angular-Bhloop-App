import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProgressComponent } from './progress.component';
import { ProgressConfig } from './progress.config';

@NgModule({
  imports: [CommonModule],
  declarations: [ ProgressComponent],
  exports: [ProgressComponent]
})
export class ProgressModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ProgressModule, providers: [ProgressConfig] };
  }
}
