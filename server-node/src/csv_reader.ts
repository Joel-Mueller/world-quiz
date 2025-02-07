import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export function readPlaces() {
  const placesMap: Map<string, PlaceRaw> = new Map();
  readMain(placesMap);
  readCapital(placesMap);
  readInfo(placesMap);
  readCapitalInfo(placesMap);
  const placesRaw: PlaceRaw[] = getArrayAndRemoveQuotes(placesMap);
  const places : Place[] = getPlaces(placesRaw);
  return JSON.stringify(places);
}

function readCSV(name: string) {
  const filePath = path.resolve(__dirname, "../data", `${name}.csv`);
  const fileContent = fs.readFileSync(filePath, "utf-8").trim();

  const records = parse(fileContent, { columns: true });
  return records;
}

function readMain(places: Map<string, PlaceRaw>) {
  const rawRecords = readCSV("main");
  for (const r of rawRecords) {
    const place: PlaceRaw = {
      name: r["country"],
      info: undefined,
      capital: undefined,
      capitalInfo: undefined,
      flag: r["flag"],
      map: r["map"],
      tag: r["tags"],
    };
    places.set(place.name, place);
  }
}

function readCapital(places: Map<string, PlaceRaw>) {
  const rawRecords = readCSV("capital");
  for (const r of rawRecords) {
    let name : string = r["country"];
    const place = places.get(name);
    place.capital = r["capital"];
  }
}

function readInfo(places: Map<string, PlaceRaw>) {
  const rawRecords = readCSV("country_info");
  for (const r of rawRecords) {
    let name : string = r["country"];
    const place = places.get(name);
    place.info = r["country info"];
  }
}

function readCapitalInfo(places: Map<string, PlaceRaw>) {
  const rawRecords = readCSV("capital_info");
  for (const r of rawRecords) {
    let name : string = r["country"];
    const place = places.get(name);
    place.capitalInfo = r["capital info"];
  }
}

function getArrayAndRemoveQuotes(places: Map<string, PlaceRaw>) {
  const placesArray : PlaceRaw[] = [];
  for (const p of places.values()) {
    if (p.capital == "") {
      p.capital = undefined;
    }
    if (p.capitalInfo == "") {
      p.capitalInfo = undefined;
    }
    if (p.info == "") {
      p.info = undefined;
    }
    if (p.flag == "") {
      p.flag = undefined;
    }
    placesArray.push(p)
  }
  return placesArray;
}

function extractTags(tagString: string): string[] {
  return tagString.split(', ').map(tag => tag.split("::")[1]);
}

function extractHTML(html: string) : string {
  return html.split(`"`)[1];
}

function getPlaces(placesRaw : PlaceRaw[]) {
  const places : Place[] = [];
  for (const p of placesRaw) {
    let flag = undefined;
    if (p.flag) {
      flag = extractHTML(p.flag);
    }
    const place : Place = {
      name: p.name,
      info: p.info || undefined,
      capital: p.capital || undefined,
      capitalInfo: p.capitalInfo || undefined,
      flag: flag,
      map: extractHTML(p.map),
      tags: extractTags(p.tag)
    }
    places.push(place);
  }
  return places;
}

interface PlaceRaw {
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tag?: string;
}

interface Place {
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tags: string[];
}
