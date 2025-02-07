import { PlaceLoader } from "../../src/ressources/PlaceLoader";
import fs from "fs";
import path from "path";

test("PlaceLoader should correctly load places from countries.json", () => {
  const loader = new PlaceLoader("../../data");
  const placesJson = loader.loadPlaces();
  const countriesPath = path.join(__dirname, "../../test/ressources/countries.json");
  const countriesJson = JSON.parse(fs.readFileSync(countriesPath, "utf-8"));
  expect(placesJson).toEqual(countriesJson);
});