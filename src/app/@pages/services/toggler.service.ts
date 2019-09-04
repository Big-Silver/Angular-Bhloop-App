import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class pagesToggleService {
  //Search Toggle
  private _searchToggle = new Subject();
  searchToggle = this._searchToggle.asObservable();

  //Quickview Toggle
  private _quickViewToggle = new Subject();
  quickViewToggle = this._quickViewToggle.asObservable();

  //Sidebar Toggle - Mobile
  private _sideBarToggle = <Subject<boolean>> new Subject();
  sideBarToggle = this._sideBarToggle.asObservable();

  //Secondary Sidebar Toggle - Mobile
  private _secondarySideBarToggle = <Subject<any>> new Subject();
  secondarySideBarToggle = this._secondarySideBarToggle.asObservable();
  
  //Horizontal Menu Toggle - Mobile
  private _mobileHorizontaMenu = <Subject<boolean>> new Subject();
  mobileHorizontaMenu = this._mobileHorizontaMenu.asObservable();

  //Menu Pin Toggle
  private _menuPinToggle = new Subject();
  menuPinToggle = this._menuPinToggle.asObservable();

  //Menu Pin Toggle
  private _menuDrawer = <Subject<string>> new Subject();
  menuDrawer = this._menuDrawer.asObservable();

  //Page Wrapper Class
  private _pageContainerClass = <Subject<string>> new Subject();
  pageContainerClass = this._pageContainerClass.asObservable();

  //Page Content Class
  private _contentClass = <Subject<string>> new Subject();
  contentClass = this._contentClass.asObservable();

  //Header Class
  private _headerClass = <Subject<string>> new Subject();
  headerClass = this._headerClass.asObservable();

  //Body Layout Class
  private _bodyLayoutClass = <Subject<string>> new Subject();
  bodyLayoutClass = this._bodyLayoutClass.asObservable();

  //App Layout
  private _layout = <Subject<string>> new Subject();
  Applayout = this._layout.asObservable();

  //Footer Visiblity
  private _footer = <Subject<boolean>> new Subject();
  Footer = this._footer.asObservable();

  //Page Container Hover Event - Used for sidebar
  private _pageContainerHover = <Subject<boolean>> new Subject();
  pageContainerHover = this._pageContainerHover.asObservable();

  setContent(className:string){
    this._contentClass.next(className);
  }

  setPageContainer(className:string){
    this._pageContainerClass.next(className);
  }

  setHeaderClass(className:string){
    this._headerClass.next(className);
  }

  setBodyLayoutClass(className:string){
    this._bodyLayoutClass.next(className);
  }

  removeBodyLayoutClass(className:string){
    this._bodyLayoutClass.next(className);
  }

  changeLayout(className:string){
    this._layout.next(className);
  }

  toggleSearch(toggle:boolean) {
    this._searchToggle.next({text:toggle});
  }

  toggleMenuPin(toggle:boolean){
    this._menuPinToggle.next({text:toggle});
  }

  toggleMenuDrawer(){
    this._menuDrawer.next();
  }
  
  toggleQuickView() {
    this._quickViewToggle.next();
  }

  toggleMobileSideBar(toggle:boolean){
    this._sideBarToggle.next(toggle);
  }

  toggleSecondarySideBar(toggle){
    this._secondarySideBarToggle.next(toggle);
  }

  toggleMobileHorizontalMenu(toggle){
    this._mobileHorizontaMenu.next(toggle);
  }

  toggleFooter(toggle:boolean){
    this._footer.next(toggle);
  }

  triggerPageContainerHover(toggle:boolean){
    this._pageContainerHover.next(toggle);
  }
  
}