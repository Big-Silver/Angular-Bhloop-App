import { Component, OnInit,Input,HostBinding } from '@angular/core';

@Component({
  selector: 'pg-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss'],
  host:{
    '[class]' : '_classMap'
  }
})
export class MenuIconComponent implements OnInit {
  _classMap:string;
  @Input() IconType: string;
  @Input() IconName: string;

  @Input() 
  set ExtraClass(value:string){
    if(value !== undefined)
    this._classMap =this._classMap +  value;
  }
  
  constructor() {
    this._classMap = "icon-thumbnail "
  }

  ngOnInit() {
  }

}
