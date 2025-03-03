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
  private currentFrontCategory?: Category;
  private currentBackCategory?: Category;
  private currentAttempts?: Map<number, number>;
  private currentTags?: Tag[];

  constructor(private http: HttpClient, private authService : AuthenticationService) {}

  newQuiz(frontCategory: Category, backCategory: Category, tags: Tag[]) {
    this.currentFrontCategory = frontCategory;
    this.currentBackCategory = backCategory;
    this.currentAttempts = new Map<number, number>();
    this.currentTags = tags;
  }

  guessedCard(id: number) {
    if (!this.currentAttempts) {
      this.currentAttempts = new Map<number, number>();
    }
    if (this.currentAttempts.has(id)) {
      this.currentAttempts.set(id, this.currentAttempts.get(id)! + 1);
    } else {
      this.currentAttempts.set(id, 1);
    }
  }

  getCurrentStat(): Stat | undefined {
    if (
      this.currentFrontCategory &&
      this.currentBackCategory &&
      this.currentAttempts &&
      this.currentTags
    ) {
      const stat: Stat = {
        date: new Date(),
        front: this.currentFrontCategory,
        back: this.currentBackCategory,
        tags: this.currentTags,
        attempts: Object.fromEntries(this.currentAttempts),
      };
      return stat;
    }
    return undefined;
  }

  finishQuiz(): void {
    const stat: Stat | undefined = this.getCurrentStat();
    if (stat) {
      this.sendStat(stat);
    }
  }

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

    return this.http.post(`${this.authService.getApiUrl()}/stats`, stat, { headers }).subscribe({
      next: (response) => console.log('Stat successfully sent:', response),
      error: (error) => console.error('Error sending stat:', error),
    });
  }

  getLatestStats(): Observable<Stat[]> {
    const token = this.authService.getToken();
    console.log('reload dashboard');
    return this.http.get<Stat[]>(`${this.authService.getApiUrl()}/stats/latest`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
}
