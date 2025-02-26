import { Component } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-manager',
  imports: [QuizComponent, FormsModule],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.scss',
})
export class QuizManagerComponent {
  quizId?: number;
  selectedFront: string = 'Name';
  selectedBack: string = 'Name';
  selectedTags: string[] = [];

  frontOptions: string[] = ['Name', 'Capital', 'Flag', 'Map'];
  backOptions: string[] = ['Name', 'Name+Capital', 'Capital'];

  tagMap: Record<string, string> = {
    'Europe': 'EUROPE',
    'Asia': 'ASIA',
    'Oceania': 'OCEANIA',
    'North_America': 'NORTH_AMERICA',
    'South_America': 'SOUTH_AMERICA',
    'Africa': 'AFRICA',
    'Oceans+Seas': 'OCEANS_AND_SEAS',
    'Continents': 'CONTINENTS',
  };

  tagOptions = Object.keys(this.tagMap);

  constructor(private apiService: ApiService) {}

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  startQuiz(): void {
    if (this.selectedTags.length === 0) {
      alert('Please select at least one tag.');
      return;
    }

    this.apiService
      .startQuiz(this.selectedTags, this.selectedFront, this.selectedBack)
      .subscribe(response => {
        this.quizId = response.id;
      });
  }
}
