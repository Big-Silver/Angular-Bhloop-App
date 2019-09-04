import { Directive, Input, OnInit,ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[pgRetina]'
})
export class pgRetinaDirective implements OnInit {
  isRetina:boolean = false;
  _srcRetina;
  _src;
  
  constructor(private El: ElementRef,private renderer: Renderer2) { 
    this.isRetina = window.devicePixelRatio > 1;
  }

  @Input()
  set src2x(value:string){
    this._srcRetina = value;
  }

  @Input()
  set src1x(value:string){
    this._src = value;
  }

  ngOnInit() {
    if(this.isRetina){
      this.renderer.setAttribute(this.El.nativeElement, "src",this._srcRetina)
    }
  }
}
