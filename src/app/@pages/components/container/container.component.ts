import { Component, OnInit,Input } from '@angular/core';
declare var pg: any;

@Component({
  selector: 'pg-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  _enableHorizontalContainer:boolean = false;
  _extraClass:string = "";
  _extraHorizontalClass:string = "";

  constructor() { }

  @Input()
  set extraClass(value) {
    this._extraClass = value
  }

  @Input()
  set extraHorizontalClass(value) {
    this._extraHorizontalClass = value
  }

  ngOnInit() {
    this._enableHorizontalContainer = pg.isHorizontalLayout
  }

}
