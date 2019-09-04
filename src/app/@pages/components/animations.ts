import { trigger, state, transition, animate, style } from '@angular/core';

export class pgAnimations {
    public static slideInOut = trigger('slideInOut', [
        state('true', style({ height: '0px' })),
        state('false', style({ height: '*' })),
        transition('1 => 0', animate('500ms ease-in')),
        transition('0 => 1', animate('500ms ease-out'))
    ]);

    public static fadeIn = trigger('fadeIn', [
	  state('void', style({ opacity: 0 })),
	  state('true', style({ opacity: 1 })),
	  state('false', style({ opacity: 0 })),
	  transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
	  transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]);
}