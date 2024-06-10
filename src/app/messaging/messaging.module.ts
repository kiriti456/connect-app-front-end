import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailsComponent } from './message-details/message-details.component';



@NgModule({
  declarations: [
    MessageListComponent,
    MessageDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MessagingModule { }
