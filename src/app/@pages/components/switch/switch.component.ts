import {
  forwardRef,
  Component,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'pg-switch',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span [ngClass]="_classMap" tabindex="0">
      <span [ngClass]="_innerPrefixCls">
        <ng-template [ngIf]="_checked">
          <ng-content select="[checked]"></ng-content>
        </ng-template>
        <ng-template [ngIf]="!_checked">
          <ng-content select="[unchecked]"></ng-content>
        </ng-template>
      </span>
    </span>
  `,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => pgSwitchComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './switch.scss'
  ]
})
export class pgSwitchComponent implements OnInit, ControlValueAccessor {
  private _disabled = false;
  _prefixCls = 'toggle-switch';
  _color = "primary";
  _innerPrefixCls = `${this._prefixCls}-inner `;
  _classMap;
  _size: string;
  _checked = false;
  
  // ngModel Access
  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  set Size(value: string) {
    this._size = value;
    this.setClassMap();
  }

  @Input()
  set Color(value: string) {
    this._color = value;
    this.setClassMap();
  }

  get Size(): string {
    return this._size;
  }

  @Input()
  set Disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get Disabled(): boolean {
    return this._disabled;
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      this.updateValue(!this._checked);
      this.onChange(this._checked);
    }
  }

  updateValue(value: boolean): void {
    if (this._checked === value) {
      return;
    }
    this._checked = value;
    this.setClassMap();
  }

  setClassMap(): void {
    this._classMap = {
      [this._prefixCls]              : true,
      [`${this._prefixCls}-checked`] : this._checked,
      [`${this._prefixCls}-disabled`]: this._disabled,
      [`${this._prefixCls}-small`]   : this._size === 'small',
      [this._color]:this._color
    };
  }

  writeValue(value: boolean): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.Disabled = isDisabled;
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
