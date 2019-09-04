
import { Component, OnInit, OnDestroy, AfterContentInit,Input,ViewChild,ElementRef, ViewEncapsulation, HostListener
  ,ContentChild,TemplateRef, } from '@angular/core';
  
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { pagesToggleService } from '../../services/toggler.service'
declare var pg: any;
@Component({
  selector: 'pg-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HorizontalMenuComponent implements AfterContentInit,OnDestroy {
  menuItems = [];
  _renduerMenuItems = [];
  _hideExtra = 0;
  currentItem = null;
  _horizontalMobileMenu:boolean = false;
  resizeId:any;
  _service;
  //Simple hack flag to check if its wrapped
  _wrapped:boolean = false;
  @ViewChild('menuItemsList') _menuItemsList: ElementRef;
  @ViewChild('menuWrapper') _menuWrapper: ElementRef;
  @ContentChild('mobileSidebarFooter') mobileSidebarFooter: TemplateRef<void>;
  constructor(private toggler:pagesToggleService) { 

		this._service = this.toggler.mobileHorizontaMenu
		.subscribe(state => {
      this._horizontalMobileMenu = state;
      this.closeHorizontalMenu();
		});
  }

  @Input()
  set HideExtra(value) {
    this._hideExtra = value
  }

  @Input()
  set Items(value) {
    this.menuItems = value
    this._renduerMenuItems = this.menuItems.slice();
  }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    this._service.unsubscribe();
  }
  ngAfterContentInit(): void {
  }
  
  ngOnChanges():void{
  }
  
  ngAfterViewInit(): void {
    setTimeout(()=>{
      if (pg.isVisibleSm() || pg.isVisibleXs()) return false 
      this._onContentChanges();
    })
  }

  closeHorizontalMenu(){
    if(!this.currentItem){
      return;
    }
    this.currentItem["open"] = false;
    this.currentItem["opening"] = false;
    this.currentItem["ghost"] ={
      visibility:"hidden"
    }
  }

  toggleLink(event,item){
    //Mobile
    if (pg.isVisibleSm() || pg.isVisibleXs()) {
      if(this.currentItem && this.currentItem != item){
        this.currentItem["mToggle"] = 'close';
      }
      this.currentItem = item;
      item.mToggle = (item.mToggle === 'close' ? 'open' : 'close');
      return false 
    }

    //Desktop
    if(this.currentItem && this.currentItem != item){
      this.currentItem["open"] = false;
      this.currentItem["opening"] = false;
      this.currentItem["ghost"] ={
        visibility:"hidden"
      }
    }
    this.currentItem = item;
    let elParent = event.currentTarget.parentNode;
    if(item["open"]){
      let el  = elParent.querySelector("ul");
      let rect = el.getBoundingClientRect();
      item.ghost = {
        width: rect.width+'px',
        height: 0,
        zIndex:"auto"
      }
      item["open"] = false;
      setTimeout(()=>{
        item["opening"] = false;
      },240);
    }
    else{
      item["open"] = true;
      setTimeout(()=>{   
        let el  = elParent.querySelector("ul");
        let rect = el.getBoundingClientRect();
        item.ghost = {
          height:"0",
          width: rect.width+'px',
          zIndex:"auto"
        }
        item.ghost = {
          width: rect.width+'px',
          height: rect.height+'px',
          zIndex:"auto"
        }
        
        setTimeout(()=>{
          item["opening"] = true;
        },140);
      },0);

    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(()=>{
      if (pg.isVisibleSm() || pg.isVisibleXs()) {
        this._renduerMenuItems = this.menuItems.slice();
        return false
      }
      this._onContentChanges();
    },140);
  }

  _onContentChanges(){
    //Cache User Items
    this._renduerMenuItems = this.menuItems.slice();
    let parentWidth = this._menuItemsList.nativeElement.offsetWidth;
    let children = this._menuItemsList.nativeElement.childNodes
    let totalChildrenWidth = 0;
    let liCount = 0
    for (var i=0; i<children.length; i++){
      if(children[i]["nodeName"] == "LI"){
        totalChildrenWidth = totalChildrenWidth + children[i].offsetWidth
        if(totalChildrenWidth > this._menuWrapper.nativeElement.offsetWidth){
          this.wrap(liCount)
          break;
        }
        liCount++;
      }
    }

    //@TODO:Will Force Wrap
    if(!this._wrapped)
      this.wrap(liCount)
  }

  wrap(startIndex:number){
    this._wrapped = true; 
    startIndex--;
    startIndex = startIndex - this._hideExtra;
    let temp = {
      type:"more",
      toggle:"close",
      submenu:[]
    }
    for(var i = startIndex; i < this._renduerMenuItems.length; i++){
      temp["submenu"].push(this._renduerMenuItems[i]);
    }
    this._renduerMenuItems.splice(startIndex, this._renduerMenuItems.length);
    this._renduerMenuItems.push(temp);
  }

  toggleHorizontalMenu(){
    if(this._horizontalMobileMenu){
      this._horizontalMobileMenu = false;
    }
    else{
      this._horizontalMobileMenu = true;
    }
    this.toggler.toggleMobileHorizontalMenu(this._horizontalMobileMenu);
  }
}
