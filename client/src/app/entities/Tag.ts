export enum Tag {
  EUROPE,
  ASIA,
  OCEANIA,
  NORTH_AMERICA,
  SOUTH_AMERICA,
  AFRICA,
  OCEANS_AND_SEAS,
  CONTINENTS,
  SOVEREIGN_STATE,
  MEDITERRANEAN,
  EUROPEAN_UNION,
  MIDDLE_EAST,
  EAST_AFRICA,
  SOUTHEAST_ASIA,
  CARIBBEAN
}

  //   US_STATES
  //   Canada_STATES
  //   SWITZERLAND_CANTON
  //   AUSTRALIA_STATES

// Used for the CSV parsing
const tagMap: Record<string, Tag> = {
  "Europe": Tag.EUROPE,
  "Asia": Tag.ASIA,
  "Oceania": Tag.OCEANIA,
  "North_America": Tag.NORTH_AMERICA,
  "South_America": Tag.SOUTH_AMERICA,
  "Africa": Tag.AFRICA,
  "Oceans+Seas": Tag.OCEANS_AND_SEAS,
  "Continents": Tag.CONTINENTS,
  "Sovereign_State": Tag.SOVEREIGN_STATE,
  "Mediterranean": Tag.MEDITERRANEAN,
  "European_Union": Tag.EUROPEAN_UNION,
  "Middle_East": Tag.MIDDLE_EAST,
  "East_Africa": Tag.EAST_AFRICA,
  "Southeast_Asia": Tag.SOUTHEAST_ASIA,
  "Caribbean" : Tag.CARIBBEAN
};

export class TagFinder {
  static getEnumByString(tagName: string): Tag | undefined {
    return tagMap[tagName];
  }

  static getStringByEnum(tagValue: Tag): string | undefined {
    return Object.keys(tagMap).find((key) => tagMap[key] === tagValue);
  }
}
