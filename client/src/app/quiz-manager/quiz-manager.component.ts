import { Component } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ApiService } from '../api.service';
import { QuizService } from '../quiz.service';
import { FormsModule } from '@angular/forms';
import { Tag } from '../ressources/Tag';
import { Quiz } from '../ressources/Quiz';
import { Category } from '../ressources/Category';

@Component({
  selector: 'app-quiz-manager',
  imports: [QuizComponent, FormsModule],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.scss',
})
export class QuizManagerComponent {
  Category = Category; // Enum has to be exported like this to use it in the html
  selectedTags: string[] = [];
  currentQuiz?: Quiz;

  tagMap: Record<string, Tag> = {
    'Europe': Tag.EUROPE,
    'Asia': Tag.ASIA,
    'Oceania': Tag.OCEANIA,
    'North America': Tag.NORTH_AMERICA,
    'South America': Tag.SOUTH_AMERICA,
    'Africa': Tag.AFRICA,
    'Oceans and Seas': Tag.OCEANS_AND_SEAS,
    'Continents': Tag.CONTINENTS,
  };

  tagOptions = Object.keys(this.tagMap);

  constructor(private apiService: ApiService, private quizService : QuizService) {}

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  endQuiz() {
    this.selectedTags = [];
    this.currentQuiz = undefined;
  }

  startQuiz(selectedFront : Category, selectedBack : Category): void {
    if (this.selectedTags.length === 0) {
      alert('Please select at least one tag.');
      return;
    }
    const mappedTags : Tag[] = this.selectedTags.map(tag => this.tagMap[tag]);
    this.currentQuiz = this.quizService.getQuiz(mappedTags, selectedFront, selectedBack);
  }
}
