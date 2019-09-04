/** code from https://github.com/angular/material2 */

import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { toBoolean } from '../util/convert';
import { pgTabComponent } from './tab.component';
import { pgTabsNavComponent } from './tabs-nav.component';

export interface AnimatedInterface {
  inkBar: boolean;
  tabPane: boolean;
}

export class TabChangeEvent {
  index: number;
  tab: pgTabComponent;
}

export type TabPosition = 'top' | 'bottom' | 'left' | 'right';
export type TabPositionMode = 'horizontal' | 'vertical';
export type TabType = 'line' | 'fillup' | 'linetriangle';

@Component({
  selector     : 'pg-tabset',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="tab-wrapper tab-{{_tabPositionMode}} {{_tabPosition}} {{_type}} {{_extra_tab_class}}"  #hostContent>
      <pg-tabs-nav
        #tabNav
        [Size]="Size"
        [Type]="Type"
        [ShowPagination]="ShowPagination"
        [PositionMode]="_tabPositionMode"
        [Position]="_tabPosition"
        [Animated]="inkBarAnimated"
        [HideBar]="Hide"
        [selectedIndex]="SelectedIndex"
        >
        <ng-template #tabBarExtraContent>
          <ng-template [ngTemplateOutlet]="TabBarExtraTemplate || TabBarExtraContent"></ng-template>
        </ng-template>
        <li
          pg-tab-label
          [disabled]="tab.disabled"
          (click)="clickLabel(i)"
          *ngFor="let tab of _tabs; let i = index">
          <a href="javascript:void(0);" class="" [class.active]="(SelectedIndex == i)&&!Hide">
          <ng-template [ngTemplateOutlet]="tab._tabHeading"></ng-template>
          </a>
        </li>
      </pg-tabs-nav>
      <div class="tab-content-wrapper {{_extra_tabcontent_class}}">
        <div class="tab-content {{_tabAnimation}}"
          #tabContent
          [class.animated]="tabPaneAnimated"
          [class.not-animated]="!tabPaneAnimated"
          [style.margin-left.%]="tabPaneAnimated&&(-SelectedIndex*100)">
          <pg-tab-body
            class="tab-pane"
            [class.active]="(SelectedIndex == i)&&!Hide"
            [class.inactive]="(SelectedIndex != i)||Hide"
            [content]="tab.content"
            *ngFor="let tab of _tabs; let i = index">
          </pg-tab-body>
        </div>
      </div>
    </div>`,
  styleUrls    : [
    './tabs.scss'
  ]
})
export class pgTabSetComponent implements AfterContentChecked, OnInit, AfterViewInit {
  _el;
  _classMap;
  _prefixCls = 'nav-tabs';
  _width;
  _tabPosition: TabPosition = 'top';
  _tabPositionMode: TabPositionMode = 'horizontal';
  _indexToSelect: number | null = 0;
  _selectedIndex: number | null = null;
  _isViewInit = false;
  _tabs: pgTabComponent[] = [];
  _tabAnimation = "";
  _extra_tab_class = "";
  _extra_tabcontent_class = "";

  @Input() TabBarExtraTemplate: TemplateRef<void>;
  @ContentChild('TabBarExtraContent') TabBarExtraContent: TemplateRef<void>;
  @ViewChild('tabNav') _tabNav: pgTabsNavComponent;
  @ViewChild('tabContent') _tabContent: ElementRef;
  @ViewChild('hostContent') _hostContent: ElementRef;
  @Input() Animated: AnimatedInterface | boolean = true;
  @Input() ShowPagination = true;
  @Input() Hide = false;

  @Input()
  set SelectedIndex(value: number | null) {
    this._indexToSelect = value;
  }

  get SelectedIndex(): number | null {
    return this._selectedIndex;
  }

  @Output()
  get SelectedIndexChange(): Observable<number> {
    return this.SelectChange.pipe(map(event => event.index));
  }

  @Output() SelectChange: EventEmitter<TabChangeEvent> = new EventEmitter<TabChangeEvent>(true);

  @Input() Size = 'default';
  _type: TabType = 'line';
  tabs: pgTabComponent[] = [];

  @Input()
  set TabPosition(value: TabPosition) {
    
    this._tabPosition = value;
    if ((this._tabPosition === 'top') || (this._tabPosition === 'bottom')) {
      this._tabPositionMode = 'horizontal';
    } else {
      this._tabPositionMode = 'vertical';
    }
  }

  get TabPosition(): TabPosition {
    return this._tabPosition;
  }

  @Input()
  set extraTabClass(value:string){
    this._extra_tab_class = value;
  }
  @Input()
  set extraTabContentClass(value:string){
    this._extra_tabcontent_class = value;
  }

  @Input()
  set Type(value: TabType) {
    if (this._type === value) {
      return;
    }
    this._type = value;
    this._setClassMap();
  }

  @Input()
  set tabAnimation(value:string){
    this._tabAnimation = value;
  }

  get Type(): TabType {
    return this._type;
  }

  _setPosition(value: TabPosition): void {
  }

  _setClassMap(): void {
  }

  clickLabel(index: number): void {
    if(this._tabs[ index ].Disabled){

    }
    else{
      this.SelectedIndex = index;
      this._tabs[ index ].pgClick.emit();
    }
  }

  ngOnInit(): void {
    this._setClassMap();
  }

  ngAfterContentChecked(): void {
    // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
    // ensures that values like NaN can't get through and which would otherwise throw the
    // component into an infinite loop (since Math.max(NaN, 0) === NaN).
    const indexToSelect = this._indexToSelect =
      Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect && this._selectedIndex != null) {
      this.SelectChange.emit(this._createChangeEvent(indexToSelect));
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: pgTabComponent, index: number) => {
      tab.position = index - indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    this._selectedIndex = indexToSelect;
  }

  ngAfterViewInit(): void {
    this._isViewInit = true;
  }

  private _createChangeEvent(index: number): TabChangeEvent {
    const event = new TabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs[ index ];
      this._tabs.forEach((item, i) => {
        if (i !== index) {
          item.pgDeselect.emit();
        }
      });
      event.tab.pgSelect.emit();
    }
    return event;
  }

  get inkBarAnimated(): boolean {
    return (this.Animated === true) || ((this.Animated as AnimatedInterface).inkBar === true);
  }

  get tabPaneAnimated(): boolean {
    return (this.Animated === true) || ((this.Animated as AnimatedInterface).tabPane === true);
  }

  constructor(private _renderer: Renderer2) {
  }
}
