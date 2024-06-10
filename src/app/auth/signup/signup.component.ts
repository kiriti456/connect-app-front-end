// signup.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = { 
          username: '', 
          password: '',
          email: '',
          fullName: ''
        };

  constructor(private authService: AuthService) {}

  signUp(): void {
    this.authService.signUp(this.user).subscribe(
      (newUser) => {
        console.log('Signup successful', newUser);
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }
}
