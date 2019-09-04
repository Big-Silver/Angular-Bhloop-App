import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

import { toBoolean } from '../util/convert';
import { pgSliderComponent } from './slider.component';

@Component({
  selector     : 'pg-slider-handle',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="ClassName" [ngStyle]="style">
      <div class="tooltip fade top" [class.show]="_showToolTip" style="top: -33px;left: -7px;">
        <div class="tooltip-inner">
          <span>{{tooltipTitle}}</span>
        </div>
      </div>
    </div>
  `
})
export class pgSliderHandleComponent implements OnChanges {
  
  // Locals
  tooltipTitle: string; 
  style: object = {};
  _showToolTip = false;

  @Input() ClassName: string;
  @Input() Vertical: string;
  @Input() Offset: number;
  @Input() Value: number; // [For tooltip]
  @Input() TipFormatter: (value: number) => string; // [For tooltip]
  @Input() set Active(value: boolean) { // [For tooltip]
    this._showToolTip = value
  }

  constructor(private _slider: pgSliderComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Offset) {
      this._updateStyle();
    }
    if (changes.Value) {
      this._updateTooltipTitle(); // [For tooltip]
    }
  }

  private _updateTooltipTitle(): void { // [For tooltip]
    this.tooltipTitle = this.TipFormatter ? this.TipFormatter(this.Value) : `${this.Value}`;
  }

  private _updateStyle(): void {
    this.style[ this.Vertical ? 'bottom' : 'left' ] = `${this.Offset}%`;
  }
}
