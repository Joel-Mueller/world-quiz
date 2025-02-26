import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { Place } from "./Place";

export class PlaceLoader {
  private placesMap: Map<string, PlaceRaw>;
  private count : number;
  private pathToData: string;

  constructor(pathToData: string) {
    this.placesMap = new Map();
    this.pathToData = pathToData;
    this.count = 0;
  }

  public loadPlaces(): Place[] {
    this.loadMain();
    this.loadCapital();
    this.loadInfo();
    this.loadCapitalInfo();
    
    const placesRaw = this.getArrayAndRemoveQuotes();
    const places = this.getPlaces(placesRaw);
    
    return places;
  }

  private readCSV(name: string) {
    const filePath = path.resolve(__dirname, this.pathToData, `${name}.csv`);
    const fileContent = fs.readFileSync(filePath, "utf-8").trim();
    return parse(fileContent, { columns: true });
  }

  private loadMain() {
    const rawRecords = this.readCSV("main");
    for (const r of rawRecords) {
      this.placesMap.set(r["country"], {
        id: this.count,
        name: r["country"],
        info: undefined,
        capital: undefined,
        capitalInfo: undefined,
        flag: r["flag"],
        map: r["map"],
        tag: r["tags"],
      });
      this.count ++;
    }
  }

  private loadCapital() {
    const rawRecords = this.readCSV("capital");
    for (const r of rawRecords) {
      const place = this.placesMap.get(r["country"]);
      if (place) place.capital = r["capital"];
    }
  }

  private loadInfo() {
    const rawRecords = this.readCSV("country_info");
    for (const r of rawRecords) {
      const place = this.placesMap.get(r["country"]);
      if (place) place.info = r["country info"];
    }
  }

  private loadCapitalInfo() {
    const rawRecords = this.readCSV("capital_info");
    for (const r of rawRecords) {
      const place = this.placesMap.get(r["country"]);
      if (place) place.capitalInfo = r["capital info"];
    }
  }

  private getArrayAndRemoveQuotes(): PlaceRaw[] {
    return Array.from(this.placesMap.values()).map((p) => ({
      id: p.id,
      name: p.name,
      info: p.info || undefined,
      capital: p.capital || undefined,
      capitalInfo: p.capitalInfo || undefined,
      flag: p.flag || undefined,
      map: p.map,
      tag: p.tag,
    }));
  }

  private extractTags(tagString: string): string[] {
    return tagString.split(', ').map(tag => tag.split("::")[1]);
  }

  private extractHTML(html: string): string {
    return html.split(`"`)[1];
  }

  private getPlaces(placesRaw: PlaceRaw[]): Place[] {
    return placesRaw.map((p) => ({
      id: p.id,
      name: p.name,
      info: p.info,
      capital: p.capital,
      capitalInfo: p.capitalInfo,
      flag: p.flag ? this.extractHTML(p.flag) : undefined,
      map: this.extractHTML(p.map),
      tags: this.extractTags(p.tag),
    }));
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
