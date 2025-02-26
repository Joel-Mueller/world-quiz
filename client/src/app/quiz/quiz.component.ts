import { Component, Input } from '@angular/core';
import { Place, Card } from './quiz.types';
import { NgIf} from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  @Input({ required: true })
  public quizId!: number;
  card?: Card;
  showBack: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCard();
  }


  loadCard(): void {
    if (this.quizId) {
      this.apiService.getCard(this.quizId).subscribe(card => {
        this.card = card;
      });
    }
  }

  submitGuess(guessed: boolean): void {
    this.showBack = false;
    if (this.quizId) {
      this.apiService.submitGuess(this.quizId, guessed).subscribe(() => {
        this.loadCard();
      });
    }
  }

  toggleCard() {
    this.showBack = !this.showBack;
  }

  getFront() : string {
    if (!this.card || !this.card.place) return "error";
    if (this.card.front === "Name+Capital") {
      return this.card.place.capital 
        ? `${this.card.place.name} (${this.card.place.capital})` 
        : this.card.place.name;
    }
    if (this.card.front === "Name") {
      return this.card.place.name;
    }
    if (this.card.front === "Capital") {
      return this.card.place.capital ? this.card.place.capital : "error";
    }
    if (this.card.front === "Map") {
      return this.card.place.map ? `media/maps/${this.card.place.map}` : "error";
    }
    if (this.card.front === "Flag") {
      return this.card.place.flag ? `media/flags/${this.card.place.flag}` : "error";
    }
    return "error";
  }

  getBack() : string {
    if (!this.card || !this.card.place) return "error";
    if (this.card.back === "Name+Capital") {
      return this.card.place.capital 
        ? `${this.card.place.name} (${this.card.place.capital})` 
        : this.card.place.name;
    }
    if (this.card.back === "Name") {
      return this.card.place.name;
    }
    if (this.card.back === "Capital") {
      return this.card.place.capital ? this.card.place.capital : "error";
    }
    return "error";
  }
}
