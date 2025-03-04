import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stat } from './entities/Stat';
import { Category } from './entities/Category';
import { HttpHeaders } from '@angular/common/http';
import { Tag } from './entities/Tag';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  sendStat(stat: Stat) {
    if (!this.authService.isLoggedIn()) {
      return;
    }
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found, cannot send stat');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .post(`${this.authService.getApiUrl()}/stats`, stat, { headers })
      .subscribe({
        next: (response) => console.log('Stat successfully sent:', response),
        error: (error) => console.error('Error sending stat:', error),
      });
  }

  getLatestStats(): Observable<Stat[]> {
    const token = this.authService.getToken();
    console.log('reload dashboard');
    return this.http.get<Stat[]>(
      `${this.authService.getApiUrl()}/stats/latest`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
