import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'pg-slider-track',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="ClassName" [ngStyle]="style"></div>
  `
})
export class pgSliderTrackComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() Offset;
  @Input() Length;

  // Static properties
  @Input() ClassName;

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

  style: { bottom?: string, height?: string, left?: string, width?: string, visibility?: string } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Included) {
      this.style.visibility = this.Included ? 'visible' : 'hidden';
    }
    if (changes.Vertical || changes.Offset || changes.Length) {
      if (this.Vertical) {
        this.style.bottom = `${this.Offset}%`;
        this.style.height = `${this.Length}%`;
      } else {
        this.style.left = `${this.Offset}%`;
        this.style.width = `${this.Length}%`;
      }
    }
  }

}
