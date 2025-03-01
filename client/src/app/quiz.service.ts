import { Injectable } from '@angular/core';
import { Place } from './ressources/Place';
import { Quiz } from './ressources/Quiz';
import { HttpClient } from '@angular/common/http';
import { Tag } from './ressources/Tag';
import { Category } from './ressources/Category';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private placesRaw: PlaceRaw[];

  constructor(private http: HttpClient) {
    this.placesRaw = [];
    this.loadMain();
  }

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
          tags: [Tag.AFRICA, Tag.ASIA],
        },
      ],
    };
  }

  public loadMain() {
    this.http.get('data/main.csv', { responseType: 'text' }).subscribe({
      next: (data) => {
        const rows = data
          .split('\n')
          .map((row) => row.trim())
          .filter((row) => row.length > 0);
        const headers = rows[0].split(',').map((h) => h.trim());

        let idCounter = 1;

        this.placesRaw = rows.slice(1).map((row) => {
          const values = row.split(',').map((v) => v.trim());
          return {
            id: idCounter++,
            name: values[0],
            info: undefined,
            capital: undefined,
            capitalInfo: undefined,
            flag: values[1],
            map: values[2],
            tag: values[4]
          } as PlaceRaw;
        });
      },
      error: (err) => {
        console.error('Error loading CSV:', err);
      },
      complete: () => {
        console.log('Main CSV file successfully loaded.');
        //console.log(this.placesRaw);
        this.loadCapitals();
      },
    });
  }

  public loadCapitals() {
    this.http.get('data/capital.csv', { responseType: 'text' }).subscribe({
      next: (data) => {
        const rows = data
          .split('\n')
          .map((row) => row.trim())
          .filter((row) => row.length > 0);
        const headers = rows[0].split(',').map((h) => h.trim());
        rows.slice(1).forEach((row) => {
          const values = row.split(',').map((v) => v.trim());
          const name = values[0];
          const place = this.placesRaw.find((p) => p.name === name);
          if (place) {
            place.capital = values[1];
          }
        });
      },
      error: (err) => {
        console.error('Error loading CSV:', err);
      },
      complete: () => {
        console.log('Capital CSV file successfully loaded.');
        console.log(this.placesRaw)
      },
    });
  }
}

interface PlaceRaw {
  id: number;
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tag?: string;
}
