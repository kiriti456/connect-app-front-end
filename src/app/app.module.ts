// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SendRequestComponent } from './friend-request/send-request/send-request.component';
import { AcceptRequestComponent } from './friend-request/accept-request/accept-request.component';
import { PostComponent } from './shared/models/post/post.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { PostListComponent } from './posts/post-list/post-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AppComponent,
    SendRequestComponent,
    AcceptRequestComponent,
    PostComponent,
    PostListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
