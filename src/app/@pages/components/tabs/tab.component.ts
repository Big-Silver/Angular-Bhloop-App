import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { pgTabSetComponent } from './tabset.component';

@Component({
  selector: 'pg-tab',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles  : [],
  host: {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class pgTabComponent implements OnDestroy, OnInit {
  private disabled = false;

  position: number | null = null;
  origin: number | null = null;

  @Input()
  set Disabled(value: boolean) {
    this.disabled = toBoolean(value);
  }

  get Disabled(): boolean {
    return this.disabled;
  }

  @Output() pgSelect = new EventEmitter();
  @Output() pgClick = new EventEmitter();
  @Output() pgDeselect = new EventEmitter();
  @ContentChild('TabHeading') _tabHeading: TemplateRef<void>;
  @ViewChild(TemplateRef) _content: TemplateRef<void>;

  get content(): TemplateRef<void> | null {
    return this._content;
  }

  constructor(private pgTabSetComponent: pgTabSetComponent) {
  }

  ngOnInit(): void {
    this.pgTabSetComponent._tabs.push(this);
  }

  ngOnDestroy(): void {
    this.pgTabSetComponent._tabs.splice(this.pgTabSetComponent._tabs.indexOf(this), 1);
  }

}
