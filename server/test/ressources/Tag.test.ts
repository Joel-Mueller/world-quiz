import { Tag } from "../../src/ressources/Tag";
import { TagFinder } from "../../src/ressources/Tag";

describe("TagFinder", () => {
  test("getEnumByString should return correct enum value for valid tag names", () => {
    expect(TagFinder.getEnumByString("Europe")).toBe(Tag.EUROPE);
    expect(TagFinder.getEnumByString("Asia")).toBe(Tag.ASIA);
    expect(TagFinder.getEnumByString("Oceania")).toBe(Tag.OCEANIA);
    expect(TagFinder.getEnumByString("North_America")).toBe(Tag.NORTH_AMERICA);
    expect(TagFinder.getEnumByString("South_America")).toBe(Tag.SOUTH_AMERICA);
    expect(TagFinder.getEnumByString("Africa")).toBe(Tag.AFRICA);
    expect(TagFinder.getEnumByString("Oceans+Seas")).toBe(Tag.OCEANS_AND_SEAS);
    expect(TagFinder.getEnumByString("Continents")).toBe(Tag.CONTINENTS);
  });

  test("getEnumByString should return undefined for invalid tag names", () => {
    expect(TagFinder.getEnumByString("InvalidTag")).toBeUndefined();
    expect(TagFinder.getEnumByString("")).toBeUndefined();
    expect(TagFinder.getEnumByString("oceania")).toBeUndefined();
  });

  test("getStringByEnum should return correct tag name for valid enum values", () => {
    expect(TagFinder.getStringByEnum(Tag.EUROPE)).toBe("Europe");
    expect(TagFinder.getStringByEnum(Tag.ASIA)).toBe("Asia");
    expect(TagFinder.getStringByEnum(Tag.OCEANIA)).toBe("Oceania");
    expect(TagFinder.getStringByEnum(Tag.NORTH_AMERICA)).toBe("North_America");
    expect(TagFinder.getStringByEnum(Tag.SOUTH_AMERICA)).toBe("South_America");
    expect(TagFinder.getStringByEnum(Tag.AFRICA)).toBe("Africa");
    expect(TagFinder.getStringByEnum(Tag.OCEANS_AND_SEAS)).toBe("Oceans+Seas");
    expect(TagFinder.getStringByEnum(Tag.CONTINENTS)).toBe("Continents");
  });

  test("getStringByEnum should return undefined for invalid enum values", () => {
    expect(TagFinder.getStringByEnum(99 as Tag)).toBeUndefined();
    expect(TagFinder.getStringByEnum(0 as Tag)).toBeUndefined();
  });
});
