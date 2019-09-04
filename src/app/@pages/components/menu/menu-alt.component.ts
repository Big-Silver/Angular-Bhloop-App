
import { Component, OnInit,Input, ViewEncapsulation } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'pg-menu-items-alt',
  templateUrl: './menu-alt.component.html',
  styleUrls: ['./menu-alt.scss'],
  animations: [
    trigger('toggleHeight', [
        state('close', style({
            height: '0',
            overflow: 'hidden',
            marginBottom:'0',
            display:'none',
           
        })),
        state('open', style({
            display:'block',
            height: '*',
            marginBottom:'10px',
            overflow: 'hidden',
        })),
        transition('close => open', animate('140ms ease-in')),
        transition('open => close', animate('140ms ease-out'))
    ])
  ],
  encapsulation:ViewEncapsulation.None 
})
export class MenuAltComponent  extends MenuComponent implements OnInit {

  ngOnInit() {
  }
  
}
