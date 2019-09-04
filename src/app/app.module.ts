// Angular Core
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// Routing
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
// Layouts
import { CorporateLayout, RootLayout, } from './@pages/layouts';
// Layout Service - Required
import { pagesToggleService } from './@pages/services/toggler.service';
// Shared Layout Components
import { SidebarComponent } from './@pages/components/sidebar/sidebar.component';
import { QuickviewComponent } from './@pages/components/quickview/quickview.component';
import { QuickviewService } from './@pages/components/quickview/quickview.service';
import { HeaderComponent } from './@pages/components/header/header.component';
import { HorizontalMenuComponent } from './@pages/components/horizontal-menu/horizontal-menu.component';
import { SharedModule } from './@pages/components/shared.module';
import { pgListViewModule } from './@pages/components/list-view/list-view.module';
import { pgCardModule } from './@pages/components/card/card.module';
import { pgCardSocialModule } from './@pages/components/card-social/card-social.module';
// AUTH
// Basic Bootstrap Modules
import {
    AccordionModule,
    AlertModule,
    BsDropdownModule,
    BsModalService,
    ButtonsModule,
    CollapseModule,
    ModalModule,
    ProgressbarModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
} from 'ngx-bootstrap';
// Pages Globaly required Components - Optional
import { pgTabsModule } from './@pages/components/tabs/tabs.module';
import { pgSwitchModule } from './@pages/components/switch/switch.module';
import { ProgressModule } from './@pages/components/progress/progress.module';
// Thirdparty Components / Plugins - Optional
import { NvD3Module } from 'ngx-nvd3';
import { NgxEchartsModule } from 'ngx-echarts';
import { IsotopeModule } from 'ngx-isotope';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { QuillModule } from 'ngx-quill';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { pgSelectModule } from './@pages/components/select/select.module';
import { InputFileModule } from 'ngx-input-file';
// Components
import { NgSelectModule } from '@ng-select/ng-select';
// Modules
import { HomeModule } from './home/home.module';
import { SessionStorageService } from './shared/services/session-storage/session-storage.service';
// template
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { pgDatePickerModule } from './@pages/components/datepicker/datepicker.module';
import { ContextMenuModule } from 'ngx-contextmenu';
// Config File

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

// Hammer Config Overide
// https://github.com/angular/angular/issues/10541
export class AppHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'pinch': {enable: false},
        'rotate': {enable: false},
        'press': {time: 1000}
    };
}

@NgModule({
    declarations: [
        AppComponent,
        CorporateLayout,
        SidebarComponent, QuickviewComponent, HeaderComponent, HorizontalMenuComponent,
        RootLayout
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        pgListViewModule,
        RouterModule.forRoot(AppRoutes),
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        ContextMenuModule.forRoot(),
        QuillModule,
        HomeModule
    ],
    providers: [
        QuickviewService,
        pagesToggleService,
        BsModalService,
        SessionStorageService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: AppHammerConfig
        }],
    bootstrap: [AppComponent],
})
export class AppModule {
}
