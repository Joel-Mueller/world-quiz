export enum Tag {
  EUROPE = 1,
  ASIA = 2,
  OCEANIA = 3,
  NORTH_AMERICA = 4,
  SOUTH_AMERICA = 5,
  AFRICA = 6,
  OCEANS_AND_SEAS = 7,
  CONTINENTS = 8,
  //   US_STATES = 9,
  //   Canada_STATES = 10,
  //   SWITZERLAND_CANTON = 11,
  //   AUSTRALIA_STATES = 12,
}

const tagMap: Record<string, Tag> = {
  "Europe": Tag.EUROPE,
  "Asia": Tag.ASIA,
  "Oceania": Tag.OCEANIA,
  "North_America": Tag.NORTH_AMERICA,
  "South_America": Tag.SOUTH_AMERICA,
  "Africa": Tag.AFRICA,
  "Oceans+Seas": Tag.OCEANS_AND_SEAS,
  "Continents": Tag.CONTINENTS,
};

export class TagFinder {
  static getEnumByString(tagName: string): Tag | undefined {
    return tagMap[tagName];
  }

  static getStringByEnum(tagValue: Tag): string | undefined {
    return Object.keys(tagMap).find((key) => tagMap[key] === tagValue);
  }
}
