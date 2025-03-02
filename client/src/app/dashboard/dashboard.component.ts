import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  imports: [LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(public authenticationService : AuthenticationService) {

  }
}
