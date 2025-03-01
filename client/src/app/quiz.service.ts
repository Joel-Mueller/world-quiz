import { Injectable } from '@angular/core';
import { Place } from './entities/Place';
import { PlaceRaw } from './entities/Place';
import { Quiz } from './entities/Quiz';
import { PlaceConverter } from './entities/Place';
import { HttpClient } from '@angular/common/http';
import { Tag } from './entities/Tag';
import { Category } from './entities/Category';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private placesRaw: PlaceRaw[];
  private places: Place[];

  constructor(private http: HttpClient) {
    this.placesRaw = [];
    this.places = [];
    this.loadMain();
  }

  public getQuiz(tags: Tag[], frontCategory: Category, backCategory: Category) {
    return {
      front: frontCategory,
      back: backCategory,
      places: this.getWithFilter(tags, frontCategory, backCategory)
    };
  }

  // Place Manager

  public getAllPlaces() {
    return this.places.slice();
  }

  public getWithFilter(tags: Tag[], category1: Category, category2: Category): Place[] {
    let filteredTags = this.filterTags(tags, this.getAllPlaces());
    let filteredCategory = this.filterCategory(category1, filteredTags);
    let filteredCategory2 = this.filterCategory(category2, filteredCategory);
    return filteredCategory2;
  }

  private filterTags(tags: Tag[], places: Place[]): Place[] {
    return places.filter(place => 
      place.tags.some(tag => tags.includes(tag))
    );
  }

  private filterCategory(category: Category, places: Place[]): Place[] {
    return places.filter((place) => {
      switch (category) {
        case Category.NAME:
          return !!place.name;
        case Category.CAPITAL:
          return !!place.capital;
        case Category.FLAG:
          return !!place.flag;
        case Category.MAP:
          return !!place.map;
        case Category.NAME_AND_CAPITAL:
          return !!place.name;
        default:
          return false;
      }
    });
  }

  // Load the CSV files

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
          const tags = values.slice(4).filter((v) => v.length > 0);
          //console.log(tags.join(','));
          return {
            id: idCounter++,
            name: values[0],
            info: undefined,
            capital: undefined,
            capitalInfo: undefined,
            flag: values[1],
            map: values[2],
            tag: tags.join(','),
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
        //console.log(this.placesRaw)
        this.loadCapitalInfo();
      },
    });
  }

  public loadCapitalInfo() {
    this.http.get('data/capital_info.csv', { responseType: 'text' }).subscribe({
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
            place.capitalInfo = values[1];
          }
        });
      },
      error: (err) => {
        console.error('Error loading CSV:', err);
      },
      complete: () => {
        console.log('Capital Info CSV file successfully loaded.');
        //console.log(this.placesRaw)
        this.loadCountryInfo();
      },
    });
  }

  public loadCountryInfo() {
    this.http.get('data/capital_info.csv', { responseType: 'text' }).subscribe({
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
            place.info = values[1];
          }
        });
      },
      error: (err) => {
        console.error('Error loading CSV:', err);
      },
      complete: () => {
        console.log('Country Info CSV file successfully loaded.');
        //console.log(this.placesRaw);
        this.makePlaces();
      },
    });
  }

  public makePlaces() {
    this.places = PlaceConverter.getPlaces(this.placesRaw);
    console.log('Places successfully convertet')
    // console.log(this.places);
    // for (const c of this.places) {
    //   console.log(PlaceConverter.toString(c));
    // }
  }
}
