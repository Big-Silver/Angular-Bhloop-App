import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { DayInterface, MonthInterface, RangePart } from './date';
import { dropDownAnimation } from '../../animations/dropdown-animations';
import { DEFAULT_DATEPICKER_POSITIONS } from '../../utils/overlay-position-map';
import { pgTimePickerInnerComponent } from '../time-picker/timepicker-inner.component';
import { pgDateScroller } from './datepicker-scroller.component';
import { toBoolean } from '../util/convert';
import { measureScrollbar } from '../util/mesureScrollBar';


@Component({
  selector: 'pg-rangepicker',
  encapsulation: ViewEncapsulation.None,
  animations: [
    dropDownAnimation
  ],
  templateUrl:'rangepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => pgRangePickerComponent),
      multi: true
    }
  ],
  styleUrls    : ['./datepicker.scss'],
})
export class pgRangePickerComponent implements ControlValueAccessor, OnInit {
  private _disabled = false;
  private _showTime: Partial<pgTimePickerInnerComponent> = null;
  private _now = moment();
  private _el;
  private _oldValue: Date[]  = this._defaultRangeValue;
  private _value: Date[] = this._defaultRangeValue;

  // avoid reference types
  private get _defaultRangeValue(): Date[] {
    return [null, null];
  }

  private get start(): moment.Moment {
    return moment(this._value[RangePart.Start]);
  }

  private get end(): moment.Moment {
    return moment(this._value[RangePart.End]);
  }

  _part = RangePart; // provided to template
  hoveringSelectValue: Date;
  _open;
  _disabledDate: (value: Date) => boolean;
  _disabledDatePart: Array<(value: Date) => boolean> = [null, null];
  _mode = ['month', 'month'];
  _selectedMonth: number[] = [];
  _selectedYear: number[] = [];
  _selectedDate: number[] = [];
  _showMonth = [this._now.month(), this._now.clone().add(1, 'month').month()];
  _showYear = [this._now.year(), this._now.year()];
  _yearPanel: string[][] = [];
  _startDecade = new Array(2).fill(Math.floor(this._showYear[RangePart.Start] / 10) * 10);
  _triggerWidth = 0;
  _dropDownPosition = 'bottom';
  _positions: ConnectionPositionPair[] = [...DEFAULT_DATEPICKER_POSITIONS];
  _offsetX: number = 0;
  @ViewChild(CdkConnectedOverlay) _cdkOverlay: CdkConnectedOverlay;
  @ViewChild('trigger') trigger;
  onTouched: () => void = () => null;
  onChange: (value: Date[]) => void = () => null;
  @Input() Size = '';
  @Input() Format = 'YYYY-MM-DD';
  @Input() AllowClear = true;

  @ViewChildren(pgTimePickerInnerComponent) timePickerInner: QueryList<pgTimePickerInnerComponent>;

  get showClearIcon(): boolean {
    return this._isComplete() && !this.Disabled && this.AllowClear;
  }

  @Input()
  set ShowTime(value: Partial<pgTimePickerInnerComponent>) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      this._showTime = toBoolean(value) ? {} : null;
    } else {
      this._showTime = value;
    }
  }

  get ShowTime(): Partial<pgTimePickerInnerComponent> {
    return this._showTime;
  }

  @Input()
  set Disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this._closeCalendar();
  }

  get Disabled(): boolean {
    return this._disabled;
  }

  get Value(): Date[] {
    return this._value || this._defaultRangeValue;
  }

  set Value(value: Date[]) {
    this._updateValue(value);
  }

  @Input()
  set DisabledDate(value: (value: Date) => boolean) {
    this._disabledDate = value;
    this._bindDisabledDateToPart();
  }

  get DisabledDate(): (value: Date) => boolean {
    return this._disabledDate;
  }

  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._generateYearPanel();
  }

  _bindDisabledDateToPart(): void {
    // when the mode is month, not needed disable it
    this._disabledDatePart[RangePart.Start] = this._mode[RangePart.Start] === 'month' ? null : this._disabledDate;
    this._disabledDatePart[RangePart.End] = this._mode[RangePart.End] === 'month' ? null : this._disabledDate;
  }

  _generateYearPanel(): void {
    let _t = [];
    for (let i = 0; i < 10; i++) {
      if (i === 1 || i === 4 || i === 7 || i === 9) {
        _t.push(i);
        this._yearPanel.push(_t);
        _t = [];
      } else {
        _t.push(i);
      }
    }
    this._yearPanel[0].unshift('start');
    this._yearPanel[3].push('end');
  }

  _openCalendar(): void {
    if (this.Disabled) {
      return;
    }
    this._mode = ['month', 'month'];
    this._open = true;
    this._setTriggerWidth();
    this._initShow();
  }

  _closeCalendar(): void {
    if (!this._open) {
      return;
    }
    if (this._isComplete()) {
        this._onChange();
    } else {
      this._value = [...this._oldValue];
    }
    this._open = false;
  }

  _clearValue(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.Value = this._defaultRangeValue;
    this.onChange(this._value);
  }

  _setTriggerWidth(): void {
    this._triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
  }

  _setShowYear(year: number, part: RangePart, $event: MouseEvent): void {
    $event.stopPropagation();
    this._showYear[part] = year;
    this._mode[part] = 'month';
  }

  _isValid(part: RangePart): boolean {
    return moment(this._value[part]).isValid();
  }

  _isComplete(): boolean {
    return this.start.isValid() && this.end.isValid();
  }

  _changeTime($event: Date, part: RangePart): void {
    this._value[part] = $event;
  }

  _blurInput(box: HTMLInputElement, part: RangePart): void {
    if (Date.parse(box.value)) {
      this._value[part] = new Date(box.value);
      this._onChange();
    }
  }

  _hoverDay(day: DayInterface): void {
    if (!this._isComplete() && this._value.some(e => moment(e).isValid())) {
      this.hoveringSelectValue = day.date.toDate();
    } else {
      this.hoveringSelectValue = null;
    }
  }

  _clickDay(day: DayInterface, part: RangePart): void {
    const newDate = day.date.toDate();
    // if have completed, then reset
    if (this._isComplete()) {
      this._value = this._defaultRangeValue;
      this._value[part] = newDate;
      this.rangeValueSort();
      return;
    }
    if (moment(this._value[part]).isValid()) {
      if (part === RangePart.Start) {
        this._value[RangePart.End] = newDate;
      } else {
        this._value[RangePart.Start] = newDate;
      }
    } else {
      this._value[part] = newDate;
    }
    // the result depends the before step
    if (this._isComplete()) {
      this.rangeValueSort();
      if (!this.ShowTime) {
        this._closeCalendar();
        return;
      }
      this._initShow();
    }
    this.rangeValueSort();
  }

  _clickMonth(month: MonthInterface, part: RangePart): void {
    this._showMonth[part] = month.index;
    this._mode[part] = 'year';
    this._bindDisabledDateToPart();
    this.adjustShowMonth();
  }

  _changeTimeView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = ['time', 'time'];
    this.setSelectedValue();
    setTimeout(_ => {
      this.timePickerInner.forEach(e => e._initPosition());
    });
  }

  _changeYearView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = ['year', 'year'];
  }

  _showBtn(part: RangePart): boolean {
    if (this._mode[part] === 'month') {
      return true;
    }
    const showStart = moment().month(this._showMonth[RangePart.Start]).year(this._showYear[RangePart.Start]);
    const showEnd = moment().month(this._showMonth[RangePart.End]).year(this._showYear[RangePart.End]);
    return !showStart.add(1, 'month').isSame(showEnd, 'month');
  }

  _preYear(part: RangePart): void {
    this._showYear[part] = this._showYear[part] - 1;
    this.adjustShowMonth();
  }

  _nextYear(part: RangePart): void {
    this._showYear[part] = this._showYear[part] + 1;
    this.adjustShowMonth();
  }

  _preMonth(part: RangePart): void {
    if (this._showMonth[part] - 1 < 0) {
      this._showMonth[part] = 11;
      this._preYear(part);
    } else {
      this._showMonth[part] = this._showMonth[part] - 1;
    }
  }

  _nextMonth(part: RangePart): void {
    if (this._showMonth[part] + 1 > 11) {
      this._showMonth[part] = 0;
      this._nextYear(part);
    } else {
      this._showMonth[part] = this._showMonth[part] + 1;
    }
  }

  _preDecade(part: RangePart): void {
    this._startDecade[part] = this._startDecade[part] - 10;
  }

  _nextDecade(part: RangePart): void {
    this._startDecade[part] = this._startDecade[part] + 10;
  }

  rangeValueSort(): void {
    if (this.start.isValid() && this.end.isValid() && this.start.isAfter(this.end)) {
      this._value = this._value.reverse();
    } else {
      this._value = this._value.concat();
    }
  }

  _initShow(): void {
    if (this.start.isValid()) {
      this._showMonth[RangePart.Start] = this.start.month();
      this._showYear[RangePart.Start] = this.start.year();
    } else {
      this._showMonth[RangePart.Start] = this._now.month();
      this._showYear[RangePart.Start] = this._now.year();
    }
    if (this.end.isValid() && !this.start.isSameOrAfter(this.end, 'month')) {
      this._showMonth[RangePart.End] = this.end.month();
      this._showYear[RangePart.End] = this.end.year();
    } else {
      const nextMonthOfStart = this.start.clone().add(1, 'month');
      const nextMonthOfNow = this._now.clone().add(1, 'month');
      this._showMonth[RangePart.End] = this.start.isValid() ? nextMonthOfStart.month() : nextMonthOfNow.month();
      this._showYear[RangePart.End] = this.start.isValid() ? nextMonthOfStart.year() : nextMonthOfNow.year();
    }
    this._showMonth = this._showMonth.concat();
    this._showYear = this._showYear.concat();
  }

  adjustShowMonth(): void {
    if (this._showYear[RangePart.Start] === this._showYear[RangePart.End] && this._showMonth[RangePart.Start] === this._showMonth[RangePart.End]) {
      this._nextMonth(RangePart.End);
    }
  }

  reposition(): void {
    if (typeof window !== 'undefined' && this._open && this._cdkOverlay && this._cdkOverlay.overlayRef) {
      const originElement = this._cdkOverlay.origin.elementRef.nativeElement;
      const overlayElement = this._cdkOverlay.overlayRef.overlayElement;
      const originX = originElement.getBoundingClientRect().x;
      const overlayWidth = overlayElement.getBoundingClientRect().width;
      const margin = window.innerWidth - originX - overlayWidth;
      this._offsetX = margin > 0 ? 0 : margin - (measureScrollbar() || 15);
      this._cdr.detectChanges();
    }
  }

  onAttach(): void {
    this.reposition();
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.reposition();
    const _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
    if (this._dropDownPosition !== _position) {
      this._dropDownPosition = _position;
      this._cdr.detectChanges();
    }
  }

  setSelectedValue(): void {
    this._selectedYear = [this.start.year(), this.end.year()];
    this._selectedMonth = [this.start.month(), this.end.month()];
    this._selectedDate = [this.start.date(), this.end.date()];
  }

  isValueChange(): boolean {
    return this._value.some((value: Date, index: number) => {
      return this._oldValue[index] === null
        || (moment.isDate(this._oldValue[index])
          && moment.isDate(value)
          && this._oldValue[index].getTime() !== value.getTime());
    });
  }

  writeValue(value: Date[]): void {
    this._updateValue(value);
  }

  registerOnChange(fn: (_: Date[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.Disabled = isDisabled;
  }

  private _updateValue(value: Date[]): void {
    if (Array.isArray(value) && value.length === 2) {
      this._value = [value[RangePart.Start], value[RangePart.End]];
    } else {
      this._value = this._defaultRangeValue;
    }
    this._oldValue = [...this._value];
  }

  private _onChange(): void {
    if (this._isValid(RangePart.Start) && this._isValid(RangePart.End) && this.isValueChange()) {
      this.onChange(this._value);
      this._oldValue = [...this._value];
    }
  }
}
