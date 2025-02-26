import { Component } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-quiz-manager',
  imports: [QuizComponent],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.scss',
})
export class QuizManagerComponent {
  quizId?: number;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.startQuiz();
  }

  startQuiz(): void {
    this.apiService.startQuiz(['Continents'], 'Map', 'Name+Capital').subscribe(response => {
      //this.quizId = response.id;
      this.quizId = 1;
    });
  }
}
