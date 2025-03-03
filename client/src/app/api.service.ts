import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stat } from './entities/Stat';
import { Category } from './entities/Category';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/quiz';
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

  finishQuiz(): Stat | undefined {
    if (
      this.currentFrontCategory &&
      this.currentBackCategory &&
      this.currentAttempts
    ) {
      const stat : Stat = {
        front: this.currentFrontCategory,
        back: this.currentBackCategory,
        attempts: Object.fromEntries(this.currentAttempts),
      };
      // TBD send to server
      return stat;
    }
    return undefined;
  }
}
