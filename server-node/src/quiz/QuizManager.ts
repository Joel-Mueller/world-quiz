import { PlaceManager } from "../ressources/PlaceManager";
import { Quiz } from "./Quiz";
import { Tag } from "../ressources/Tag";
import { Category } from "../ressources/Category";
import { Place } from "../ressources/Place";

export class QuizManager {
  private placeManager: PlaceManager;
  private quizes: Map<number, Quiz>;

  constructor(placeManager: PlaceManager) {
    this.placeManager = placeManager;
    this.quizes = new Map<number, Quiz>();
  }

  public createQuiz(
    tags: Tag[],
    frontCategory: Category,
    backcategory: Category
  ) {
    const places: Place[] = this.placeManager.getWithFilter(
      tags,
      frontCategory,
      backcategory
    );
    this.quizes.set(1, new Quiz(places, frontCategory, backcategory));
  }

  public getCurrentCard(id: number) {
    return this.quizes.get(id).getCurrentCard();
  }

  public guessed(id: number, guessed: boolean) {
    return this.quizes.get(id).guessedCurrentCard(guessed);
  }
}
