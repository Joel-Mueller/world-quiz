import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';
import { ApiService } from '../api.service';
import { Stat } from '../entities/Stat';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StatsDetailComponent } from '../stats-detail/stats-detail.component';

@Component({
  selector: 'app-dashboard',
  imports: [LoginComponent, CommonModule, StatsDetailComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats: Stat[] = [];
  private loginSubscription!: Subscription;

  constructor(
    public authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadLatestStats();
    this.loginSubscription = this.authenticationService
      .getLoginStatus()
      .subscribe((loggedIn) => {
        if (loggedIn) {
          this.loadLatestStats();
        }
      });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  loadLatestStats(): void {
    if (this.isLoggedIn()) {
      this.apiService.getLatestStats().subscribe({
        next: (response) => {
          this.stats = response;
        },
        error: (err) => console.error('Error fetching stats:', err),
      });
    }
  }
}
