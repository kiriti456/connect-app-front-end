import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendRequestComponent } from './models/friend-request/friend-request.component';
import { PostComponent } from './models/post/post.component';
import { UserComponent } from './models/user/user.component';



@NgModule({
  declarations: [
    FriendRequestComponent,
    MessageComponent,
    PostComponent,
    UserComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
