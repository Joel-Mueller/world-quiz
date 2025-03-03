import { Tag } from "./Tag";
import { TagFinder } from "./Tag";

export interface Place {
  id: number;
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tags: Tag[];
}

export interface PlaceRaw {
  id: number;
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tag?: string;
}


export class PlaceConverter {
  private static extractTags(tagString: string): Tag[] {
    const tagsString : string[] = tagString.split(',').map(tag => tag.split("::")[1].replace(/"/g, ''));
    return tagsString
      .map(tag => TagFinder.getEnumByString(tag))
      .filter((tag): tag is Tag => tag !== undefined);
  }

  private static extractHTML(html: string): string {
    const match = html.match(/([\w-]+\.(svg|png))/);
    return match ? match[1] : "error";
  }

  private static removeEmptyStrings(s : string | undefined) {
    if (s && s === '') return undefined;
    return s;
  }

  public static getPlaces(placesRaw: PlaceRaw[]): Place[] {
    return placesRaw.map((p) => ({
      id: p.id,
      name: p.name,
      info: this.removeEmptyStrings(p.info),
      capital: this.removeEmptyStrings(p.capital),
      capitalInfo: this.removeEmptyStrings(p.capitalInfo),
      flag: p.flag ? `media/flags/${this.extractHTML(p.flag)}` : undefined,
      map: `media/maps/${this.extractHTML(p.map)}`,
      tags: p.tag ? this.extractTags(p.tag) : [],
    }));
  }

  public static toString(place: Place): string {
    const tags = place.tags
      .map(tag => TagFinder.getStringByEnum(tag) || "Unknown")
      .join(", ");
    return `Place: ${place.name}, Tags: [${tags}]`;
  }


}