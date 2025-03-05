import { Component, HostListener } from '@angular/core';
import { Place } from '../entities/Place';
import { Category } from '../entities/Category';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  Category = Category;
  showBack: boolean = false;
  currentPlace?: Place;
  frontCategory?: Category;
  backCategory?: Category;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.frontCategory = this.quizService.getFrontCategory();
    this.backCategory = this.quizService.getBackCategory();
    this.loadCard();
  }

  getFront() {
    return this.quizService.getFront();
  }

  getBack() {
    return this.quizService.getBack();
  }

  getLength() {
    return this.quizService.getLentgh();
  }

  loadCard(): void {
    this.currentPlace = this.quizService.getCurrentPlace();
  }

  loadSummary() {
    return this.quizService.loadSummary();
  }

  getTopFiveAttempts() {
    return this.quizService.getTopFiveAttempts();
  }

  submitGuess(guessed: boolean): void {
    if (this.showBack == false) {
      this.showBack = true;
      return;
    }
    this.showBack = false;
    this.quizService.guessed(guessed);
    this.loadCard();
  }

  toggleCard() {
    this.showBack = !this.showBack;
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
}
