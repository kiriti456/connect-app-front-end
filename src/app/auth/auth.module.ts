// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule],
  providers: [AuthService],
})
export class AuthModule {}
