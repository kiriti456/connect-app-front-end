import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AcceptRequestComponent } from './friend-request/accept-request/accept-request.component';
import { SendRequestComponent } from './friend-request/send-request/send-request.component';
import { PostComponent } from './shared/models/post/post.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'send-request', component: SendRequestComponent },
  { path: 'accept-request', component: AcceptRequestComponent },
  { path: 'posts', component: PostComponent },
  { path: 'home/:username', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}