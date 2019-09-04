import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { _MESSAGE_DEFAULT_CONFIG_PROVIDER } from './message-config';
import { MessageContainerComponent } from './message-container.component';
import { MessageComponent } from './message.component';

const providers = [
  _MESSAGE_DEFAULT_CONFIG_PROVIDER
];

@NgModule({
  imports: [ CommonModule, OverlayModule ],
  declarations: [ MessageContainerComponent, MessageComponent ],
  providers,
  entryComponents: [ MessageContainerComponent ]
})
export class MessageModule { }
