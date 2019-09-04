import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector     : 'pg-tab-body',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  `,
})
export class pgTabBodyComponent {
  @Input() content: TemplateRef<void>;
}
