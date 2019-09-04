import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { dropDownAnimation } from '../../animations/dropdown-animations';
import { reqAnimFrame } from '../util/request-animation';
import { toBoolean } from '../util/convert';

export interface TimeUnitInterface {
  index: number;
  name: string;
  disabled: boolean;
}

@Component({
  selector     : 'pg-timepicker-inner',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span
      class="time-picker"
      [ngClass]="{'ant-time-picker-large':Size=='large','ant-time-picker-small':Size=='small'}">
      <div
        class="time-picker-panel"
        [@dropDownAnimation]="'bottom'">
        <div class="time-picker-inner"
          [class.time-picker-column-3]="_showHour&&_showMinute&&_showSecond"
          [class.time-picker-column-2]="_showHour&&_showMinute&&!_showSecond"
          [class.time-picker-column-1]="_showHour&&(!_showMinute)&&(!_showSecond)">
        <div class="time-picker-combobox">
          <div
            class="time-picker-select"
            #hourListInstance
            *ngIf="_showHour">
            <ul>
              <ng-template
                ngFor
                let-_hour
                [ngForOf]="_hourList"
                let-i="index">
                 <li
                   [ngClass]="_hour.name"
                   *ngIf="!(HideDisabledOptions&&_hour.disabled)"
                   [class.option-selected]="_hour.index===_selectedHour"
                   [class.option-disabled]="_hour.disabled"
                   (click)="_selectHour(hourListInstance,_hour.index,_hour.disabled)">
                   {{ _hour.name }}
                 </li>
              </ng-template>
            </ul>
          </div>
          <div
            class="time-picker-select"
            #minuteListInstance
            *ngIf="_showMinute">
            <ul>
              <ng-template
                ngFor
                let-_minute
                [ngForOf]="_minuteList"
                let-i="index">
                 <li
                   [ngClass]="_minute.name"
                   *ngIf="!(HideDisabledOptions&&_minute.disabled)"
                   [class.option-selected]="_minute.index===_selectedMinute"
                   [class.option-disabled]="_minute.disabled"
                   (click)="_selectMinute(minuteListInstance,_minute.index,_minute.disabled)">
                   {{ _minute.name }}
                 </li>
              </ng-template>
            </ul>
          </div>
          <div
            class="time-picker-select"
            #secondListInstance
            *ngIf="_showSecond">
            <ul>
              <ng-template
                ngFor
                let-_second
                [ngForOf]="_secondList"
                let-i="index">
                 <li
                   [ngClass]="_second.name"
                   *ngIf="!(HideDisabledOptions&&_second.disabled)"
                   [class.option-selected]="_second.index===_selectedSecond"
                   [class.option-disabled]="_second.disabled"
                   (click)="_selectSecond(secondListInstance,_second.index,_second.disabled)">
                   {{ _second.name }}
                 </li>
              </ng-template>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </span>`,
  animations   : [
    dropDownAnimation
  ],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => pgTimePickerInnerComponent),
      multi      : true
    }
  ],
  styleUrls    : ['./timepicker.scss']
})
export class pgTimePickerInnerComponent implements OnInit, ControlValueAccessor {
  private _disabled = false;
  private _hideDisabledOptions = false;
  _now = new Date();
  _el: HTMLElement;
  _open = false;
  _hourList: TimeUnitInterface[] = [];
  _minuteList: TimeUnitInterface[] = [];
  _secondList: TimeUnitInterface[] = [];
  _value = null;
  _selectedHour = moment(this._now).hours();
  _selectedMinute = moment(this._now).minutes();
  _selectedSecond = moment(this._now).seconds();
  _format = 'HH:mm:ss';
  _showHour = this._format.indexOf('HH') > -1;
  _showMinute = this._format.indexOf('mm') > -1;
  _showSecond = this._format.indexOf('ss') > -1;
  _width = `${( +this._showHour + +this._showMinute + +this._showSecond) * 56 + 1 }px`;
  _DisabledHours: () => number[];
  // ngModel Access
  onChange: (value: Date) => void = () => null;
  onTouched: () => void = () => null;

  @ViewChild('hourListInstance') _hourListInstance;
  @ViewChild('minuteListInstance') _minuteListInstance;
  @ViewChild('inputTimeInstance') _inputTimeInstance;
  @ViewChild('secondListInstance') _secondListInstance;

  @Input()
  set HideDisabledOptions(value: boolean) {
    this._hideDisabledOptions = toBoolean(value);
  }

  get HideDisabledOptions(): boolean {
    return this._hideDisabledOptions;
  }

  @Input() PlaceHolder = "Select Time";
  @Input() Size: 'small' | 'large' | 'default' = 'default';

  @Input()
  set DisabledHours(fun: () => number[]) {
    this._DisabledHours = fun;
    this._buildHours();
  }

  get DisabledHours(): () => number[] {
    return this._DisabledHours;
  }

  @Input() DisabledMinutes: (hour: number) => number[];
  @Input() DisabledSeconds: (hour: number, minute: number) => number[];

  @Input()
  set Disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get Disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set Format(value: string) {
    this._format = value;
    this._showHour = this._format.indexOf('HH') > -1;
    this._showMinute = this._format.indexOf('mm') > -1;
    this._showSecond = this._format.indexOf('ss') > -1;
    this._width = `${( +this._showHour + +this._showMinute + +this._showSecond) * 56 + 1 }px`;
  }

  get Format(): string {
    return this._format;
  }

  get Value(): Date {
    return this._value || this._now;
  }

  set Value(value: Date) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._selectedHour = moment(this.Value).hours();
    this._selectedMinute = moment(this.Value).minutes();
    this._selectedSecond = moment(this.Value).seconds();
  }

  _scrollToSelected(instance: HTMLElement, index: number, duration: number = 0, unit: string): void {
    const _transIndex = this._translateIndex(index, unit);
    const currentOption = (instance.children[ 0 ].children[ _transIndex ] || instance.children[ 0 ].children[ 0 ]) as HTMLElement;
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }

  // got from rc-timepicker
  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;

    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }

  _selectHour(instance: HTMLElement, index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this._scrollToSelected(instance, index, 120, 'hour');
    this._selectedHour = index;
    this.Value = moment(this.Value).hour(index).toDate();
    this.onChange(this._value);
    this._buildMinutes();
    this._buildSeconds();
  }

  _selectMinute(instance: HTMLElement, index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this._scrollToSelected(instance, index, 120, 'minute');
    this._selectedMinute = index;
    this.Value = moment(this.Value).minute(index).toDate();
    this.onChange(this._value);
    this._buildSeconds();
  }

  _selectSecond(instance: HTMLElement, index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this._scrollToSelected(instance, index, 120, 'second');
    this._selectedSecond = index;
    this.Value = moment(this.Value).second(index).toDate();
    this.onChange(this._value);
  }

  _translateIndex(index: number, unit: string): number {
    if (!this.HideDisabledOptions) {
      return index;
    }
    if (unit === 'hour') {
      const disabledHours = this.DisabledHours && this.DisabledHours();
      return this._calcIndex(disabledHours, index);
    } else if (unit === 'minute') {
      const disabledMinutes = this.DisabledMinutes && this.DisabledMinutes(this._selectedHour);
      return this._calcIndex(disabledMinutes, index);
    } else if (unit === 'second') {
      const disabledSeconds = this.DisabledSeconds && this.DisabledSeconds(this._selectedHour, this._selectedMinute);
      return this._calcIndex(disabledSeconds, index);
    }
  }

  _calcIndex(array: number[], index: number): number {
    if (array && array.length) {
      return index - array.reduce((pre, value) => {
        return pre + (value < index ? 1 : 0);
      }, 0);
    } else {
      return index;
    }
  }

  _initPosition(): void {
    this._selectedHour = moment(this.Value).hours();
    this._selectedMinute = moment(this.Value).minutes();
    this._selectedSecond = moment(this.Value).seconds();
    if (this._showHour) {
      this._scrollToSelected(this._hourListInstance.nativeElement, this._selectedHour, 0, 'hour');
    }
    if (this._showMinute) {
      this._scrollToSelected(this._minuteListInstance.nativeElement, this._selectedMinute, 0, 'minute');
    }
    if (this._showSecond) {
      this._scrollToSelected(this._secondListInstance.nativeElement, this._selectedSecond, 0, 'second');
    }
  }

  _buildTime(): void {
    this._buildHours();
    this._buildMinutes();
    this._buildSeconds();
  }

  _buildHours(): void {
    this._hourList = [];
    for (let i = 0; i <= 23; i++) {
      this._hourList.push({
        disabled: this.DisabledHours && (this.DisabledHours().indexOf(i) !== -1),
        name    : i.toString().length === 1 ? ('0' + i) : ('' + i),
        index   : i
      });
    }
  }

  _buildMinutes(): void {
    this._minuteList = [];
    for (let i = 0; i <= 59; i++) {
      this._minuteList.push({
        disabled: this.DisabledMinutes && (this.DisabledMinutes(this._selectedHour).indexOf(i) !== -1),
        name    : i.toString().length === 1 ? ('0' + i) : ('' + i),
        index   : i
      });
    }
  }

  _buildSeconds(): void {
    this._secondList = [];
    for (let i = 0; i <= 59; i++) {
      this._secondList.push({
        disabled: this.DisabledSeconds && (this.DisabledSeconds(this._selectedHour, this._selectedMinute).indexOf(i) !== -1),
        name    : i.toString().length === 1 ? ('0' + i) : ('' + i),
        index   : i
      });
    }
  }

  writeValue(value: Date): void {
    this.Value = value;
  }

  registerOnChange(fn: (_: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.Disabled = isDisabled;
  }

  constructor(public _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this._buildTime();
  }
}
