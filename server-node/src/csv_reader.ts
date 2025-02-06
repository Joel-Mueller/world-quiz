import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export class PlaceReader {
  private readCSV(name: string) {
    const filePath = path.resolve(__dirname, "../data", `${name}.csv`);
    const fileContent = fs.readFileSync(filePath, "utf-8").trim();

    const records = parse(fileContent, { columns: true });
    for (const r of records) {
        console.log(r)
    }
    return records
  }

  public hello() {
    return this.readCSV("main");
  }
}

export class CSVMain {
  country: string;
  flag: string;
  map: string;
  regionCode?: string;
  tags: string;

  constructor(
    country: string,
    flag: string,
    map: string,
    regionCode: string | undefined,
    tags: string
  ) {
    this.country = country;
    this.flag = flag;
    this.map = map;
    this.regionCode = regionCode;
    this.tags = tags;
  }
}
