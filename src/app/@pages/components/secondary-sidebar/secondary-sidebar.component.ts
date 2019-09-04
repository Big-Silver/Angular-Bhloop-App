import { Component, OnInit,OnDestroy, Input } from '@angular/core';
import { pagesToggleService } from '../../services/toggler.service'
@Component({
  selector: 'pg-secondary-sidebar',
  templateUrl: './secondary-sidebar.component.html',
  styleUrls: ['./secondary-sidebar.component.scss']
})
export class SecondarySidebarComponent implements OnInit,OnDestroy {
  _toggleMobileSidebar = false;
  _togglePosition;
  _extraClass;
  _service;

  constructor(private toggler:pagesToggleService) { }
  
  ngOnInit() {
    this._service = this.toggler.secondarySideBarToggle
		.subscribe(state => {
      if(typeof(state) === "boolean"){
        this._toggleMobileSidebar = state;
      }
      else{ 
        this._toggleMobileSidebar = state.open;
        let rect = state.$event.target.getBoundingClientRect();
        this._togglePosition = {
          "position":"fixed",
          "top":(rect.top + rect.height)+"px",
          "left":rect.left+"px",
          "transform":"translateX(-50%)"
        }
      }
		  
		});
  }
  ngOnDestroy() {
    this._service.unsubscribe();
  }
  @Input()
  set extraClass(value:string){
    this._extraClass = value;
  } 

}
