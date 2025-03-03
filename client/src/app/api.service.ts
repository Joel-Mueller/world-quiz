import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stat } from './entities/Stat';
import { Category } from './entities/Category';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/stats';
  private tokenKey = 'auth_token';
  private currentFrontCategory?: Category;
  private currentBackCategory?: Category;
  private currentAttempts?: Map<number, number>;

  constructor(private http: HttpClient) {}

  newQuiz(frontCategory: Category, backCategory: Category) {
    this.currentFrontCategory = frontCategory;
    this.currentBackCategory = backCategory;
    this.currentAttempts = new Map<number, number>();
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
      this.currentAttempts
    ) {
      const stat: Stat = {
        front: this.currentFrontCategory,
        back: this.currentBackCategory,
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
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      console.error('No token found, cannot send stat');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}`, stat, { headers }).subscribe({
      next: (response) => console.log('Stat successfully sent:', response),
      error: (error) => console.error('Error sending stat:', error),
    });
  }
}
