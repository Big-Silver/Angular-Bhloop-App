import {
  Component,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Output
} from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector     : 'pgpost',
  encapsulation: ViewEncapsulation.None,
  templateUrl : './post.component.html',
})
export class pgPost {
  @ContentChild('PostTitle') PostTitle: TemplateRef<void>;
  
}
