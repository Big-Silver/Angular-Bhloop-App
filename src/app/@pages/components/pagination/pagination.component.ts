import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
  } from '@angular/core';
  import { toBoolean } from '../util/convert';
  
  @Component({
    selector     : 'pg-pagination',
    encapsulation: ViewEncapsulation.None,
    templateUrl     : "pagination.component.html",
    styleUrls    : ["./pagination.scss"]
  })
  export class PaginationComponent {
    private _showSizeChanger = false;
    private _showTotal = false;
    private _showQuickJumper = false;
    private _simple = false;
    _el: HTMLElement;
    _current = 1;
    _total: number;
    _pageSize = 10;
    _firstIndex = 1;
    _lastIndex = Infinity;
    _pages = [];
    _options = [ 10, 20, 30, 40, 50 ];
  
    @Input() InTable = false;
  
    @Input()
    set ShowSizeChanger(value: boolean) {
      this._showSizeChanger = toBoolean(value);
    }
  
    get ShowSizeChanger(): boolean {
      return this._showSizeChanger;
    }
  
    @Input()
    set ShowQuickJumper(value: boolean) {
      this._showQuickJumper = toBoolean(value);
    }
  
    get ShowQuickJumper(): boolean {
      return this._showQuickJumper;
    }
  
    @Input()
    set ShowTotal(value: boolean) {
        this._showTotal = toBoolean(value);
    }
  
    get ShowTotal(): boolean {
      return this._showTotal;
    }
  
    @Input()
    set Simple(value: boolean) {
      this._simple = toBoolean(value);
    }
  
    get Simple(): boolean {
      return this._simple;
    }
  
    @Input() Size: string;
  
    @Output() PageSizeChange: EventEmitter<number> = new EventEmitter();
    @Output() PageIndexChange: EventEmitter<number> = new EventEmitter();
    @Output() PageIndexClickChange: EventEmitter<number> = new EventEmitter();
  
    _jumpBefore(pageSize: number): void {
      this._jumpPage(this._current - Math.round(pageSize / 2));
    }
  
    _jumpAfter(pageSize: number): void {
      this._jumpPage(this._current + Math.round(pageSize / 2));
    }
  
    /** page size changer select values */
    @Input()
    set PageSizeSelectorValues(value: number[]) {
      if (value) {
        this._options = value;
      }
    }
  
    @Input()
    set PageIndex(value: number) {
      if (this._current === value) {
        return;
      }
      if (value > this._lastIndex || value < this._firstIndex) {
        return;
      }
      this._current = Number(value);
      this._buildIndexes();
    }
  
    get PageIndex(): number {
      return this._current;
    }
  
    @Input()
    set PageSize(value: number) {
      if (value === this._pageSize) {
        return;
      }
      this._pageSize = value;
      this.PageIndexChange.emit(this.PageIndex);
      this._buildIndexes();
    }
  
    get PageSize(): number {
      return this._pageSize;
    }
  
    @Input()
    set Total(value: number) {
      if (value === this._total) {
        return;
      }
      this._total = value;
      this._buildIndexes();
    }
  
    get Total(): number {
      return this._total;
    }
  
    _pageSizeChange($event: number): void {
      this.PageSize = $event;
      this.PageSizeChange.emit($event);
    }
  
    _PageIndexChange($event: number): void {
      this.PageIndex = $event;
      this.PageIndexChange.emit(this.PageIndex);
    }
  
    /** generate indexes list */
    _buildIndexes(): void {
      this._lastIndex = Math.ceil(this._total / this._pageSize);
      if (this._current > this._lastIndex) {
        this.PageIndex = this._lastIndex;
        this.PageIndexChange.emit(this.PageIndex);
      }
      const tmpPages = [];
      if (this._lastIndex <= 9) {
        for (let i = 2; i <= this._lastIndex - 1; i++) {
          tmpPages.push({ index: i });
        }
      } else {
        const current = +this._current;
        let left = Math.max(2, current - 2);
        let right = Math.min(current + 2, this._lastIndex - 1);
  
        if (current - 1 <= 2) {
          right = 5;
        }
  
        if (this._lastIndex - current <= 2) {
          left = this._lastIndex - 4;
        }
  
        for (let i = left; i <= right; i++) {
          tmpPages.push({ index: i });
        }
      }
      this._pages = tmpPages;
    }
  
    _jumpPage(index: number): void {
      if (index === this._firstIndex - 1 || index === this._lastIndex +  1 || index === this.PageIndex) {
        return ;
      }
  
      if (index < this._firstIndex) {
        this.PageIndex = this._firstIndex;
      } else if (index > this._lastIndex) {
        this.PageIndex = this._lastIndex;
      } else {
        this.PageIndex = index;
      }
      this.PageIndexClickChange.emit(this.PageIndex);
      this.PageIndexChange.emit(this.PageIndex);
    }
  
    get _isLastIndex(): boolean {
      return this._current === this._lastIndex;
    }
  
    get _isFirstIndex(): boolean {
      return this._current === this._firstIndex;
    }
  
    get _roundPageSize(): number {
      return Math.round(this._pageSize / 2);
    }
  
    constructor(private _elementRef: ElementRef) {
      this._el = this._elementRef.nativeElement;
    }
  }
  