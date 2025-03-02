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
  username: string = '';
  password: string = '';
  alert? : string;

  constructor(private authenthicationService: AuthenticationService) {}

  login() {
    if (!this.authenthicationService.login(this.username, this.password)) {
      this.alert = 'authenthication failed';
    }
  }
}
