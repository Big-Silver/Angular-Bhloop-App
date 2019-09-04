import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  forwardRef,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { dropDownAnimation } from '../../animations/dropdown-animations';
import { DEFAULT_DATEPICKER_POSITIONS } from '../../utils/overlay-position-map';
import { toBoolean } from '../util/convert';
import { pgTimePickerInnerComponent } from './timepicker-inner.component';

@Component({
  selector     : 'pg-timepicker',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    dropDownAnimation
  ],
  templateUrl     : "timepicker.component.html",
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => pgTimePickerComponent),
      multi      : true
    }
  ],
  styleUrls    : ['./timepicker.scss']
})
export class pgTimePickerComponent extends pgTimePickerInnerComponent {
  private _timePickerDisabled = false;
  _dropDownPosition = 'bottom';
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_DATEPICKER_POSITIONS ];

  @ViewChild('trigger') trigger;

  @Input()
  set Disabled(value: boolean) {
    this._timePickerDisabled = toBoolean(value);
    this._closeCalendar();
  }

  get Disabled(): boolean {
    return this._timePickerDisabled;
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
    if (this._dropDownPosition !== _position) {
      this._dropDownPosition = _position;
      this._cdr.detectChanges();
    }
  }

  _manualChangeInput(box: HTMLInputElement): void {
    const _tempMoment = moment(box.value, this._format);
    if (Date.parse(_tempMoment.toDate().toString())) {
      this.Value = new Date((moment(this._value).hour(_tempMoment.hour()).minute(_tempMoment.minute()).second(_tempMoment.second())).toDate().getTime());
      this.onChange(this._value);
    }
    // this._closeCalendar();
  }

  _overHour(): void {
    const _start = this._format.indexOf('HH');
    const _end = _start + 2;
    this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
  }

  _overMinute(): void {
    const _start = this._format.indexOf('mm');
    const _end = _start + 2;
    this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
  }

  _overSecond(): void {
    const _start = this._format.indexOf('ss');
    const _end = _start + 2;
    this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
  }

  _clearValue(): void {
    this.Value = null;
    this._selectedHour = null;
    this._selectedMinute = null;
    this.onChange(this._value);
    this._selectedSecond = null;
  }

  _openCalendar(): void {
    this._open = true;
    setTimeout(_ => {
      this._initPosition();
      this._inputTimeInstance.nativeElement.setSelectionRange(0, 8);
    });
  }

  _closeCalendar(): void {
    if (!this._open) {
      return;
    }
    this._open = false;
  }

  setDisabledState(isDisabled: boolean): void {
    this.Disabled = isDisabled;
  }
}
