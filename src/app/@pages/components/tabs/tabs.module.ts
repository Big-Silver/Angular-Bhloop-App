import { ObserversModule } from '@angular/cdk/observers';
// import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { pgTabBodyComponent } from './tab-body.component';
import { pgTabLabelDirective } from './tab-label.directive';
import { pgTabComponent } from './tab.component';
import { pgTabsInkBarDirective } from './tabs-ink-bar.directive';
import { pgTabsNavComponent } from './tabs-nav.component';
import { pgTabSetComponent } from './tabset.component';

@NgModule({
  declarations: [ pgTabComponent, pgTabSetComponent, pgTabsNavComponent, pgTabLabelDirective, pgTabsInkBarDirective, pgTabBodyComponent ],
  exports     : [ pgTabComponent, pgTabSetComponent, pgTabsNavComponent, pgTabLabelDirective, pgTabsInkBarDirective, pgTabBodyComponent ],
  imports     : [ CommonModule, ObserversModule ]
})
export class pgTabsModule {
}
