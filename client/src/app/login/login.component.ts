import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  registerView : boolean = false;
  username: string = '';
  password: string = '';
  usernameRegister: string = '';
  passwordRegister: string = '';
  alert? : string;

  constructor(private authenthicationService: AuthenticationService) {}

  openRegisterView() {
    this.registerView = true;
    this.clearUsernamePasswordFields();
  }

  closerRegisterView() {
    this.registerView = false;
    this.clearUsernamePasswordFields();
  }

  clearUsernamePasswordFields() {
    this.username = '';
    this.usernameRegister = '';
    this.password = '';
    this.passwordRegister = '';
  }

  login() {
    this.authenthicationService.login(this.username, this.password).subscribe({
      next: () => {
        this.alert = 'Login successful!';
      },
      error: (err) => {
        this.alert = 'Login failed! ' + (err.error?.message || 'An unexpected error occurred.');;
        console.error('Login error:', err);
      }
    });
  }

  register() {
    this.authenthicationService.register(this.usernameRegister, this.passwordRegister).subscribe({
      next: (response) => {
        this.alert = response.message;
      },
      error: (err) => {
        this.alert = 'Registration failed! ' + (err.error?.message || 'An unexpected error occurred.');
        console.error('Registration error:', err);
      }
    });
  }
}
