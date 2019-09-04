import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewContainerComponent } from './list-view-container/list-view-container.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ObserversModule } from '@angular/cdk/observers';
@NgModule({
  imports: [
    CommonModule,
    ObserversModule
  ],
  declarations: []
})
export class pgListViewModule { }
