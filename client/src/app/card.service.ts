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
export class CardService {
  private placesRaw: PlaceRaw[];
  private places: Place[];
  private loadedSuccessfully: boolean;
  private idCounter = 1;

  constructor(private http: HttpClient) {
    this.loadedSuccessfully = false;
    this.placesRaw = [];
    this.places = [];
    this.loadMain();
  }

  public getQuiz(
    tags: Tag[],
    frontCategory: Category,
    backCategory: Category,
    maxCount: number | undefined
  ) {
    return {
      front: frontCategory,
      back: backCategory,
      places: this.getWithFilter(tags, frontCategory, backCategory, maxCount),
    };
  }

  // Place Manager

  private getAllPlaces(): Place[] {
    return this.places.slice();
  }

  private getWithFilter(
    tags: Tag[],
    category1: Category,
    category2: Category,
    maxCount: number | undefined
  ): Place[] {
    let filteredTags = this.filterTags(tags, this.getAllPlaces());
    let filteredCategory = this.filterCategory(category1, filteredTags);
    let filteredCategory2 = this.filterCategory(category2, filteredCategory);
    let shuffled = this.shuffleArray(filteredCategory2);
    let reduced = this.reduceArray(shuffled, maxCount);
    return reduced;
  }

  private filterTags(tags: Tag[], places: Place[]): Place[] {
    if (tags.includes(Tag.ALL)) return places;
    return places.filter((place) =>
      place.tags.some((tag) => tags.includes(tag))
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

  private shuffleArray(array: any[]): any[] {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  private reduceArray<T>(arr: T[], size: number | undefined): T[] {
    if (!size) return arr;
    return arr.length > size ? arr.slice(0, size) : arr;
  }

  // Load the CSV files

  private loadMain() {
    this.http.get('data/main.csv', { responseType: 'text' }).subscribe({
      next: (data) => {
        const rows = data
          .split('\n')
          .map((row) => row.trim())
          .filter((row) => row.length > 0);
        const headers = rows[0].split(',').map((h) => h.trim());

        this.placesRaw = rows.slice(1).map((row) => {
          const values = row.split(',').map((v) => v.trim());
          const tags = values.slice(4).filter((v) => v.length > 0);
          // console.log(tags.join(','));
          return {
            id: this.idCounter++,
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
        // console.log('Main CSV file successfully loaded.');
        // console.log(this.placesRaw);
        this.loadCapitals();
      },
    });
  }

  private loadCapitals() {
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
        // console.log('Capital CSV file successfully loaded.');
        // console.log(this.placesRaw)
        this.loadCapitalInfo();
      },
    });
  }

  private loadCapitalInfo() {
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
        // console.log('Capital Info CSV file successfully loaded.');
        // console.log(this.placesRaw)
        this.loadCountryInfo();
      },
    });
  }

  private loadCountryInfo() {
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
        //console.log('Country Info CSV file successfully loaded.');
        //console.log(this.placesRaw);
        this.makePlaces();
      },
    });
  }

  private makePlaces() {
    this.places = PlaceConverter.getPlaces(this.placesRaw);
    // console.log('Places successfully convertet')
    // console.log(this.places);
    // for (const c of this.places) {
    //   console.log(PlaceConverter.toString(c));
    // }
    this.readUSStates();
  }

  readUSStates() {
    this.http
      .get('us-states/usa-state-capitals.csv', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          const rows = data
            .split('\n')
            .map((row) => row.trim())
            .filter((row) => row.length > 0);
          const headers = rows[0].split(',').map((h) => h.trim());
          rows.slice(1).forEach((row) => {
            const values = row.split(',').map((v) => v.trim());
            const nameState = values[0];
            const capitalState = values[2];
            const mapState = values[5];
            const place: Place = {
              id: this.idCounter++,
              name: nameState,
              info: undefined,
              capital: capitalState,
              capitalInfo: undefined,
              flag: undefined,
              map: `us-states/map/${mapState}`,
              tags: [Tag.USA_STATES],
            };
            this.places.push(place);
          });
        },
        error: (err) => {
          console.error('Error loading CSV:', err);
        },
        complete: () => {
          //console.log('Country Info CSV file successfully loaded.');
          //console.log(this.placesRaw);
          this.compareToTestFile();
        },
      });
  }

  private compareToTestFile(): void {
    const jsonUrl = 'test/places.json';
    this.http.get(jsonUrl).subscribe({
      next: (data) => {
        const dataJson = JSON.stringify(data);
        const dataCSV = JSON.stringify(this.places);
        if (dataJson == dataCSV) {
          console.log('Data is properly loaded');
          this.loadedSuccessfully = true;
        } else {
          console.log('Data is not properly loaded');
          console.log(dataCSV);
        }
      },
      error: (err) => {
        console.error('Error loading JSON:', err);
      },
      complete: () => {
        console.log('JSON file successfully loaded.');
      },
    });
  }

  public isLoadedSuccessfully() {
    return this.loadedSuccessfully;
  }
}
