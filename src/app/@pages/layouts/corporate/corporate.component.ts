import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RootLayout } from '../root/root.component';
import { Router } from '@angular/router';
import { pagesToggleService } from '../../services/toggler.service';
import { Observable } from 'rxjs/observable';

@Component({
    selector: 'corporate-layout',
    templateUrl: './corporate.component.html',
    styleUrls: ['./corporate.component.scss'],
    encapsulation: ViewEncapsulation.None
})

// tslint:disable-next-line:component-class-suffix
export class CorporateLayout extends RootLayout implements OnInit {

    @ViewChild('menuHome') menuHome: ElementRef;
    menuLinks = [];

    gymName: Observable<string>;

    language: string;

    constructor(
        router: Router,
        toggler: pagesToggleService) {
        super(toggler, router);
    }

    ngOnInit() {
        this.changeLayout('menu-pin');
        this.changeLayout('menu-behind');
        // Will sidebar close on screens below 1024
        this.autoHideMenuPin();
        this.language = navigator.language;
        this.setMenuLinks();
    }

    setMenuLinks() {
        this.menuLinks = [
            {
                label: 'Home',
                routerLink: '/home'
            }
        ];

        this.menuLinks = this.menuLinks.filter(m => !m.isNotAuthorized);
    }

    logout(): void {
        this.router.navigate(['/']);
    }
}
