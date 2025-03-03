import { Component, Input, HostListener } from '@angular/core';
import { Place } from '../entities/Place';
import { ApiService } from '../api.service';
import { Quiz } from '../entities/Quiz';
import { Category } from '../entities/Category';
import { Stat } from '../entities/Stat';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  @Input({ required: true })
  quiz!: Quiz;
  quizPlaces: Place[];
  Category = Category;
  showBack: boolean = false;
  currentPlace?: Place;
  stat?: Stat;

  constructor(private apiService: ApiService) {
    this.quizPlaces = [];
  }

  ngOnInit() {
    this.quizPlaces = this.quiz.places.slice();
    this.loadCard();
    this.stat = undefined;
  }

  loadCard(): void {
    this.currentPlace = this.quizPlaces.shift();
    if (this.quizPlaces.length > 0) {
      this.stat = this.apiService.finishQuiz();
    }
  }

  submitGuess(guessed: boolean): void {
    if (this.showBack == false) {
      this.showBack = true;
      return;
    }
    this.showBack = false;
    if (this.currentPlace) {
      this.apiService.guessedCard(this.currentPlace.id);
    }
    if (!guessed && this.currentPlace) {
      this.quizPlaces.push(this.currentPlace);
    }
    this.loadCard();
  }

  toggleCard() {
    this.showBack = !this.showBack;
  }

  getFront(): string {
    if (!this.currentPlace) return 'error';
    if (this.quiz.front === Category.NAME_AND_CAPITAL) {
      return this.currentPlace.capital
        ? `${this.currentPlace.name} (${this.currentPlace.capital})`
        : this.currentPlace.name;
    }
    if (this.quiz.front === Category.NAME) {
      return this.currentPlace.name;
    }
    if (this.quiz.front === Category.CAPITAL) {
      return this.currentPlace.capital ? this.currentPlace.capital : 'error';
    }
    if (this.quiz.front === Category.MAP) {
      return this.currentPlace.map ? this.currentPlace.map : 'error';
    }
    if (this.quiz.front === Category.FLAG) {
      return this.currentPlace.flag ? this.currentPlace.flag : 'error';
    }
    return 'error';
  }

  getBack(): string {
    if (!this.currentPlace) return 'error';
    if (this.quiz.back === Category.NAME_AND_CAPITAL) {
      return this.currentPlace.capital
        ? `${this.currentPlace.name} (${this.currentPlace.capital})`
        : this.currentPlace.name;
    }
    if (this.quiz.back === Category.NAME) {
      return this.currentPlace.name;
    }
    if (this.quiz.back === Category.CAPITAL) {
      return this.currentPlace.capital ? this.currentPlace.capital : 'error';
    }
    return 'error';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === '2') {
      event.preventDefault();
      this.submitGuess(true);
    }
    if (event.key === '1') {
      event.preventDefault();
      this.submitGuess(false);
    }
  }

  loadCardsCompleted(): string {
    return `You guessed ${this.quiz.places.length} Cards`;
  }

  loadSummary(): string {
    return `You guessed ${this.quiz.places.length} Cards`;
  }

  getTopFiveAttempts(stat: Stat): string {
    const filteredAttempts = Object.entries(stat.attempts)
      .map(([key, value]) => ({ key: Number(key), value }))
      .filter(({ value }) => value > 1)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    if (filteredAttempts.length === 0) {
      return 'Everything was guessed on the first attempt!';
    }

    let output = 'Places you struggled the most: ';
    output += filteredAttempts
      .map(({ key, value }) => {
        const place = this.quiz.places.find((p) => p.id === key);
        return place
          ? `${place.name} (${value} attempts)`
          : `Unknown Place (${value} attempts)`;
      })
      .join(', ');

    return output;
  }
}
