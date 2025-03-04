import { Component, Input } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ApiService } from '../api.service';
import { CardService } from '../card.service';
import { FormsModule } from '@angular/forms';
import { Tag } from '../entities/Tag';
import { Category } from '../entities/Category';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-manager',
  imports: [QuizComponent, FormsModule],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.scss',
})
export class QuizManagerComponent {
  Category = Category; // Enum has to be exported like this to use it in the html
  selectedTags: string[] = [];
  maxCards?: number;

  tagMap: Record<string, Tag> = {
    '🌍 Everything': Tag.ALL,
    '🏔 Europe': Tag.EUROPE,
    '🏯 Asia': Tag.ASIA,
    '🏝️ Oceania': Tag.OCEANIA,
    '🦅 North America': Tag.NORTH_AMERICA,
    '🦜 South America': Tag.SOUTH_AMERICA,
    '🦁 Africa': Tag.AFRICA,
    '🌊 Oceans and Seas': Tag.OCEANS_AND_SEAS,
    '🗺️ Continents': Tag.CONTINENTS,
    '🏛️ Sovereign State': Tag.SOVEREIGN_STATE,
    '🌿 Mediterranean': Tag.MEDITERRANEAN,
    '🇪🇺 European Union': Tag.EUROPEAN_UNION,
    '🏜️ Middle East': Tag.MIDDLE_EAST,
    '🦓 East Africa': Tag.EAST_AFRICA,
    '🍜 Southeast Asia': Tag.SOUTHEAST_ASIA,
    '🏖️ Caribbean': Tag.CARIBBEAN,
    '🇺🇸 USA States': Tag.USA_STATES,
    '🇨🇦 Canada Provinces and Territories': Tag.CANADA_STATES,
    '🇦🇺 Australia ???': Tag.AUSTRALIA_STATES,
  };

  tagOptions = Object.keys(this.tagMap);

  constructor(
    private quizService: QuizService,
    private cardService: CardService
  ) {}

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  reset() {
    this.selectedTags = [];
    this.maxCards = undefined;
  }

  startQuiz(selectedFront: Category, selectedBack: Category): void {
    if (this.selectedTags.length === 0) {
      alert('Please select at least one tag.');
      return;
    }
    const mappedTags: Tag[] = this.selectedTags.map((tag) => this.tagMap[tag]);
    this.quizService.startQuiz(
      mappedTags,
      selectedFront,
      selectedBack,
      this.maxCards
    );
    this.reset();
  }

  endQuiz() {
    this.quizService.finish();
  }

  loadedSuccessfully() {
    return this.cardService.isLoadedSuccessfully();
  }

  quizActive() {
    return this.quizService.quizRunning();
  }
}
