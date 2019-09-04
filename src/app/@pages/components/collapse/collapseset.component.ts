import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { pgCollapseComponent } from './collapse.component';

@Component({
  selector     : 'pg-collapseset',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="card-group" [class.horizontal]="Horizontal">
      <ng-content></ng-content>
    </div>
  `,
})
export class pgCollapsesetComponent {
  private _accordion = false;
  private _horizontal = true;
  panels: pgCollapseComponent[] = [];

  @Input()
  set Accordion(value: boolean) {
    this._accordion = value;
  }

  get Accordion(): boolean {
    return this._accordion;
  }

  @Input()
  set Horizontal(value: boolean) {
    this._horizontal = value;
  }

  get Horizontal(): boolean {
    return this._horizontal;
  }

  pgClick(collapse: pgCollapseComponent): void {
    if (this.Accordion) {
      this.panels.map((item, index) => {
        const curIndex = this.panels.indexOf(collapse);
        if (index !== curIndex) {
          item.Active = false;
        }
      });
    }
  }

  addTab(collapse: pgCollapseComponent): void {
    this.panels.push(collapse);
  }
}
