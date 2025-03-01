import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/quiz';

  constructor(private http: HttpClient) {}

  startQuiz(tags: string[], frontCategory: string, backCategory: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      tags,
      frontCategory,
      backCategory
    });
  }

  // getCard(quizId: number): Observable<Card> {
  //   return this.http.get<Card>(`${this.apiUrl}/${quizId}/card`);
  // }

  // submitGuess(quizId: number, guessed: boolean): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/${quizId}/guess`, { guessed });
  // }
}

  