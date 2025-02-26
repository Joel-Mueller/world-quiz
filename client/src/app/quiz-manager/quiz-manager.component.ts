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
  selectedTags: string[] = [];

  // left is for presentation and right is for the api
  tagMap: Record<string, string> = {
    'Europe': 'Europe',
    'Asia': 'Asia',
    'Oceania': 'Oceania',
    'North America': 'North_America',
    'South America': 'South_America',
    'Africa': 'Africa',
    'Oceans and Seas': 'Oceans+Seas',
    'Continents': 'Continents',
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

  startQuiz(selectedFront : string, selectedBack : string): void {
    if (this.selectedTags.length === 0) {
      alert('Please select at least one tag.');
      return;
    }

    const mappedTags = this.selectedTags.map(tag => this.tagMap[tag]);

    this.apiService
      .startQuiz(mappedTags, selectedFront, selectedBack)
      .subscribe(response => {
        this.quizId = response.id;
      });
  }
}
