import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pg-breadcrumb',
  template: '<ng-content></ng-content>',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
