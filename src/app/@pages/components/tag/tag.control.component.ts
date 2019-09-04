import { AnimationEvent } from '@angular/animations';
import {
    forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tagAnimation } from '../../animations/tag-animations';
import {pgTagComponent} from './tag.component';
import { toBoolean } from '../util/convert';

@Component({
  selector       : 'pg-tag-control',
  encapsulation: ViewEncapsulation.None,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => pgTagControl),
      multi      : true
    }
  ],
  templateUrl       : "./tag.control.component.html",
  styleUrls      : ["./tag.scss"]
})
export class pgTagControl implements OnInit, ControlValueAccessor {

    onChange: (value: string[]) => void = () => null;
    onTouched: () => void = () => null;
    @ViewChild('wrapper') wrapper: ElementRef;
    _tags =[];
    inputValue = '';
    _placeholder ='';
    @Input() 
    set placeholder(value: string) {
      this._placeholder = value
    }

    handleClose(removedTag: any): void {
        this._tags = this._tags.filter(tag => tag !== removedTag);
    }
    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }
    handleInputConfirm(): void {
        if (this.inputValue) {
            this._tags.push(this.inputValue);
        }
        this.inputValue = '';
   } 
   handleFocus():void{
    this.wrapper.nativeElement.parentNode.parentNode.classList.add('focused');
   } 
   handleFocusOut():void{
    this.wrapper.nativeElement.parentNode.parentNode.classList.remove('focused');
   }
   handleInputBack():void{
    if (!this.inputValue) {
        this._tags.splice(-1,1);
    }
   }  
   updateValue(value:string[] ): void {
    this._tags = value;
  }
   writeValue(value: string[]): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (_: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
   ngOnInit(): void {
  }
}
