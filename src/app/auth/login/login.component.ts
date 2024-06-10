// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{

  user = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user).subscribe(
      (login_message) => {
        console.log(login_message);
        if (login_message === 'not found') {
          console.log('Invalid Credentials');
          alert('Invalid Credentials');
        } else {
          this.authService.loginForAuth();
          const username = this.user.username;
          this.authService.setUserName(username);
          this.router.navigate(['home', username]);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

}
