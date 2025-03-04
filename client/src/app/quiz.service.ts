import { Injectable } from '@angular/core';
import { Quiz } from './entities/Quiz';
import { Place } from './entities/Place';
import { CardService } from './card.service';
import { Category } from './entities/Category';
import { Tag } from './entities/Tag';
import { Stat } from './entities/Stat';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private currentQuiz?: Quiz;
  private currentQuizPlaces: Place[];
  private currentPlace?: Place;
  private currentAttempts?: Map<number, number>;
  private currentTags?: Tag[];

  constructor(
    private cardService: CardService,
    private apiService: ApiService
  ) {
    this.currentQuizPlaces = [];
  }

  public startQuiz(
    tags: Tag[],
    frontCategory: Category,
    backCategory: Category,
    maxCount: number | undefined
  ) {
    this.currentQuiz = this.cardService.getQuiz(
      tags,
      frontCategory,
      backCategory,
      maxCount
    );
    this.currentAttempts = new Map<number, number>();
    this.currentTags = tags;
    if (this.currentQuiz) {
      this.currentQuizPlaces = this.currentQuiz.places.slice();
    }
    this.loadNewCard();
  }

  private loadNewCard() {
    this.currentPlace = this.currentQuizPlaces.shift();
  }

  public getCurrentPlace(): Place | undefined {
    return this.currentPlace;
  }

  public guessed(guessed: boolean) {
    if (this.currentPlace) {
      if (!guessed) {
        this.currentQuizPlaces.push(this.currentPlace);
      }
      this.incrementAttempt(this.currentPlace.id);
      this.loadNewCard();
    }
  }

  public finish() {
    const stat: Stat | undefined = this.getCurrentStat();
    if (stat) {
      this.apiService.sendStat(stat);
    }
    this.currentQuiz = undefined;
    this.currentPlace = undefined;
    this.currentQuizPlaces = [];
  }

  public quizRunning() {
    if (this.currentQuiz) {
      return true;
    }
    return false;
  }

  public getFrontCategory(): Category | undefined {
    if (this.currentQuiz) {
      return this.currentQuiz.front;
    }
    return undefined;
  }

  public getBackCategory(): Category | undefined {
    if (this.currentQuiz) {
      return this.currentQuiz.back;
    }
    return undefined;
  }

  public getFront(): string {
    if (!this.currentPlace || !this.currentQuiz) return 'error';
    if (this.currentQuiz.front === Category.NAME_AND_CAPITAL) {
      return this.currentPlace.capital
        ? `${this.currentPlace.name} (${this.currentPlace.capital})`
        : this.currentPlace.name;
    }
    if (this.currentQuiz.front === Category.NAME) {
      return this.currentPlace.name;
    }
    if (this.currentQuiz.front === Category.CAPITAL) {
      return this.currentPlace.capital ? this.currentPlace.capital : 'error';
    }
    if (this.currentQuiz.front === Category.MAP) {
      return this.currentPlace.map ? this.currentPlace.map : 'error';
    }
    if (this.currentQuiz.front === Category.FLAG) {
      return this.currentPlace.flag ? this.currentPlace.flag : 'error';
    }
    return 'error';
  }

  public getBack(): string {
    if (!this.currentPlace || !this.currentQuiz) return 'error';
    if (this.currentQuiz.back === Category.NAME_AND_CAPITAL) {
      return this.currentPlace.capital
        ? `${this.currentPlace.name} (${this.currentPlace.capital})`
        : this.currentPlace.name;
    }
    if (this.currentQuiz.back === Category.NAME) {
      return this.currentPlace.name;
    }
    if (this.currentQuiz.back === Category.CAPITAL) {
      return this.currentPlace.capital ? this.currentPlace.capital : 'error';
    }
    return 'error';
  }

  public getLentgh() {
    return this.currentQuizPlaces.length + 1;
  }

  private incrementAttempt(id: number) {
    if (!this.currentAttempts) {
      this.currentAttempts = new Map<number, number>();
    }
    if (this.currentAttempts.has(id)) {
      this.currentAttempts.set(id, this.currentAttempts.get(id)! + 1);
    } else {
      this.currentAttempts.set(id, 1);
    }
  }

  public getCurrentStat(): Stat | undefined {
    if (this.currentQuiz && this.currentAttempts && this.currentTags) {
      const stat: Stat = {
        date: new Date(),
        front: this.currentQuiz.front,
        back: this.currentQuiz.back,
        tags: this.currentTags,
        attempts: Object.fromEntries(this.currentAttempts),
      };
      return stat;
    }
    return undefined;
  }

  public loadSummary(): string {
    if (this.currentQuiz) {
      return `You guessed ${this.currentQuiz.places.length} Cards`;
    }
    return 'error, could not count the cards you studied';
  }

  public getTopFiveAttempts(): string {
    const stat: Stat | undefined = this.getCurrentStat();
    if (stat == undefined) {
      return 'Error, stats could not get loaded';
    }
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
        if (this.currentQuiz) {
          const place = this.currentQuiz.places.find((p) => p.id === key);
          return place
            ? `${place.name} (${value} attempts)`
            : `Unknown Place (${value} attempts)`;
        }
        return 'error';
      })
      .join(', ');

    return output;
  }
}
