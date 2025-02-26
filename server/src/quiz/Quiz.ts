import { Category } from "../ressources/Category";
import { CategoryFinder } from "../ressources/Category";
import { Place } from "../ressources/Place";
import { Card } from "./Card";

export class Quiz {
  private places: Place[];
  private attemts: Map<number, number>;
  private placeIds: number[];
  private count: number;
  private categoryFront: Category;
  private categoryBack: Category;
  private currentCard: Card;

  constructor(
    places: Place[],
    categoryFront: Category,
    categoryBack: Category
  ) {
    this.places = places;
    this.attemts = new Map<number, number>();
    this.placeIds = places.map((place) => place.id);
    this.count = 0;
    this.categoryFront = categoryFront;
    this.categoryBack = categoryBack;
    this.loadCurrentCard();
  }

  private loadCurrentCard() {
    if (this.placeIds.length === 0) {
      this.currentCard = this.getFinished();
      return;
    }
    let place: Place | undefined = this.places.find(
      (p) => p.id === this.placeIds[0]
    );
    if (place === undefined) {
      this.currentCard = this.getFinished();
      return;
    }
    this.currentCard = {
      count: this.count,
      front: CategoryFinder.getStringByEnum(this.categoryFront),
      back: CategoryFinder.getStringByEnum(this.categoryBack),
      place: place,
      finished: false,
    };
    this.count += 1;
  }

  public getCurrentCard() {
    return this.currentCard;
  }

  private getFinished(): Card {
    return {
      count: this.count,
      front: CategoryFinder.getStringByEnum(this.categoryFront),
      back: CategoryFinder.getStringByEnum(this.categoryBack),
      finished: true,
    };
  }

  public guessedCurrentCard(guessed: boolean) {
    const firstId = this.placeIds.shift();
    if (firstId === undefined) {
      this.loadCurrentCard();
      return;
    }
    let currentAttempts: number = this.attemts.get(firstId);
    if (currentAttempts === undefined) {
      currentAttempts = 0;
    }
    currentAttempts += 1;
    this.attemts.set(firstId, currentAttempts)
    if (!guessed) {
      this.placeIds.push(firstId);
    }
    this.loadCurrentCard();
  }
}
