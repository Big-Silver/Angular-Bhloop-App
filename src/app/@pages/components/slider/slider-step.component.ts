import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { toBoolean } from '../util/convert';
import { Marks, MarksArray, pgSliderMarksComponent } from './slider-marks.component';

@Component({
  selector     : 'pg-slider-step',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="{{PrefixCls}}-step">
      <span *ngFor="let attr of attrs; trackBy: trackById" [ngClass]="attr.classes" [ngStyle]="attr.style"></span>
    </div>
  `
})
export class pgSliderStepComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() LowerBound: number = null;
  @Input() UpperBound: number = null;
  @Input() MarksArray: MarksArray;

  // Static properties
  @Input() PrefixCls: string;

  @Input()
  set Vertical(value: boolean) { // Required
    this._vertical = toBoolean(value);
  }

  get Vertical(): boolean {
    return this._vertical;
  }

  @Input()
  set Included(value: boolean) {
    this._included = toBoolean(value);
  }

  get Included(): boolean {
    return this._included;
  }

  // TODO: using named interface
  attrs: Array<{ id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object }>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.MarksArray) {
      this.buildAttrs();
    }
    if (changes.MarksArray || changes.LowerBound || changes.UpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, attr: { id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object }): number {
    return attr.id;
  }

  buildAttrs(): void {
    const orient = this.Vertical ? 'bottom' : 'left';
    const prefixCls = this.PrefixCls;
    this.attrs = this.MarksArray.map(mark => {
      const { value, offset } = mark;
      return {
        id     : value,
        value,
        offset,
        style  : {
          [orient]: `${offset}%`
        },
        classes: {
          [`${prefixCls}-dot`]       : true,
          [`${prefixCls}-dot-active`]: false
        }
      };
    });
  }

  togglePointActive(): void {
    if (this.attrs && this.LowerBound !== null && this.UpperBound !== null) {
      this.attrs.forEach(attr => {
        const value    = attr.value;
        const isActive = (!this.Included && value === this.UpperBound) ||
            (this.Included && value <= this.UpperBound && value >= this.LowerBound);
        attr.classes[ `${this.PrefixCls}-dot-active` ] = isActive;
      });
    }
  }

}
