import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
declare var pg: any;

@Directive({
  selector: '[pg-view-trigger]'
})
export class ViewDirective {
	@Input() parentView: string;
	@Input() animationType: string;

 	constructor(private parallaxEl: ElementRef,private renderer: Renderer2) { 
 	}
	@HostListener('click', ['$event']) 
	onClick(e) {
		e.preventDefault();
		if(this.parentView != null){
			var parent = document.getElementById(this.parentView);
			if(parent){
				if(this.animationType!= null){
					pg.toggleClass(parent, this.animationType);
				}
				else{
					pg.toggleClass(parent, 'push-parrallax');
				}
			}
		}
	}
}
