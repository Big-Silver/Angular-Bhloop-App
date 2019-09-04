import { Directive,ElementRef,HostListener,Renderer2,HostBinding,OnInit } from '@angular/core';

@Directive({
  selector: '[pgFormGroupDefault]'
})
export class FormGroupDefaultDirective implements OnInit{

	@HostBinding('class.focused') _isActive: boolean = false;

	@HostListener('click') onclick() {
		if(this._isActive) return;
		this._isActive = true;
		let inputEl = this.El.nativeElement.querySelector("input");
		if(inputEl){
			inputEl.focus();
		}

	}

	constructor(private El: ElementRef,private renderer: Renderer2) { 

	}
	ngOnInit(){
		let inputEl = this.El.nativeElement.querySelector("input");
		if(inputEl){
			this.renderer.listen(inputEl, 'focus', (event) => {
				this._isActive = true
			});
			this.renderer.listen(inputEl, 'focusout', (event) => {
				this._isActive = false
			});
		}
	}
}
