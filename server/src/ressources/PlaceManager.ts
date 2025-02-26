import { Place } from "./Place";
import { PlaceLoader } from "./PlaceLoader";
import { Tag } from "./Tag";
import { Category } from "./Category";
import { TagFinder } from "./Tag";

export class PlaceManager {
  private places: Place[];

  constructor(path: string) {
    const loader: PlaceLoader = new PlaceLoader(path);
    this.places = loader.loadPlaces();
  }

  public getAllPlaces() {
    return this.places.slice();
  }

  public getWithFilter(tags: Tag[], category1: Category, category2: Category): Place[] {
    let filteredTags = this.filterTags(tags, this.places);
    let filteredCategory = this.filterCategory(category1, filteredTags);
    let filteredCategory2 = this.filterCategory(category2, filteredCategory);
    return filteredCategory2;
  }

  private filterTags(tags: Tag[], places: Place[]) {
    let placesFiltered: Place[] = [];
    for (const p of places) {
      let t: string[] = p.tags;
      for (const w of t) {
        const tagEnum = TagFinder.getEnumByString(w);
        if (tags.includes(tagEnum)) {
          placesFiltered.push(p);
          break;
        }
      }
    }
    return placesFiltered;
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
}
