
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
  EventEmitter,
  Output,
  NgZone
} from '@angular/core';
import * as moment from 'moment';
import {ObserversModule} from '@angular/cdk/observers';
import { toBoolean } from '../util/convert';
import { pgDatePickerComponent } from './datepicker.component'

@Component({
  selector     : 'pg-datepicker-scroller',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="wrap-scroller" #wrapper>
    <div class="horizontal-dates" style="position: relative;" >
    <div class="d-flex flex-row full-width" #monthSlider  (cdkObserveContent)="_onContentChanges()">
        <ng-container *ngFor="let monthIndex of _List">
            <ng-container *ngIf="(monthIndex === _selectedMonth || monthIndex == _showMonth); else determineBlock">
                <a class="month-select selected-date" title="" #selectedElement  (click)="_changeMonthView()">
                    {{ _getMonthForamated(monthIndex) }}
                </a>
            </ng-container>
            <ng-template #determineBlock>
                <a class="month-select" title="" (click)="_changeMonth(monthIndex)">
                    {{ _getMonthForamated(monthIndex) }}
                </a>
            </ng-template>
        </ng-container>
        </div>             
    </div>
</div>
  `,
})
export class pgDateScroller  implements OnInit{
    _monthList = [];
    _List = [];
    _yearList = []
    _selectedMonth;
    _selectedYear;
    _showMonth;
    _mode='month';
    _el: HTMLElement;
    @ViewChild('selectedElement') _selectedElement: any;
    @ViewChild('monthSlider') _monthSlider: any;
    @ViewChild('wrapper') _wrapper: any;
    @Output() onDateChange: EventEmitter<void> = new EventEmitter();
    constructor(private _elementRef: ElementRef,private _renderer: Renderer2, private picker:pgDatePickerComponent){
        this._el = this._elementRef.nativeElement;
    }
    _generate(): void {
        let _t = [];
        if(this._mode == "month"){
            for (let i = 0; i < 12; i++) {
                this._monthList.push(i);
              }
            this._List = this._monthList
        }
        else{
            for (let i = 0; i < 10; i++) {
                this._yearList.push(i);
              } 
            this._List = this._yearList;
        }

    }
    ngOnInit(): void {
        this._generate();
    }
    ngAfterViewInit():void{
        this.alignToElement();
    }
    @Input()
    set selectedMonth(value:Date){
        this._selectedMonth = value;
    }

    @Input()
    set Mode(value:string){
        this._mode = value;
    }

    @Input()
    set selectedYear(value:Date){
        this._selectedYear = value;
    }

    _getMonthForamated(value:number):string{
        return moment().month(value).format("MMMM");
    }
    _onContentChanges(){
        this.alignToElement();
    }
    _changeMonthView(){
        this.picker._changeMonthView();
    }
    _changeMonth(value:any){    
        if(this._selectedMonth > value){
            this.picker._showMonth = this.picker._showMonth - (this._selectedMonth - value)
            
        }
        else{
            this.picker._showMonth = this.picker._showMonth + (value - this._selectedMonth)
        }
        this._selectedMonth = value;
    }

    alignToElement(): void {
        // if(this._selectedMonth == 0 || this._selectedMonth == 11){
        //     return;
        // }
         let rect = this._el.querySelector(".wrap-scroller").getBoundingClientRect();
         let offset  = this._selectedElement ? this._selectedElement.nativeElement.offsetLeft + 'px' : '0';
         let realOffset = -(parseFloat(offset) - (rect.width/2 - this._selectedElement.nativeElement.offsetWidth/2)) +'px';
         this._renderer.setStyle(this._monthSlider.nativeElement, 'transform',
           `translate3d(${realOffset}, 0px, 0px)`);
      }
}
