import { Injectable } from '@angular/core';
import { Place } from './ressources/Place';
import { Quiz } from './ressources/Quiz';
import { Tag } from './ressources/Tag';
import { Category } from './ressources/Category';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  public getQuiz(tags: Tag[], category1: Category, category2: Category) {
    return {
      front: Category.MAP,
      back: Category.NAME_AND_CAPITAL,
      places: [
        {
          id: 1,
          name: 'Abkhazia',
          info: 'A region in the South Caucasus.',
          capital: 'Sukhumi',
          capitalInfo: 'The capital city of Abkhazia.',
          flag: 'ug-flag-abkhazia.svg',
          map: 'ug-map-abkhazia.png',
          tags: [Tag.AFRICA, Tag.ASIA]
        }
      ]
    };
  }
}
