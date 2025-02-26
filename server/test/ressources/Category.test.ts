import { Category, CategoryFinder } from "../../src/ressources/Category";

describe("CategoryFinder", () => {
  test("getEnumByString should return correct enum value for valid category name", () => {
    expect(CategoryFinder.getEnumByString("Name")).toBe(Category.NAME);
    expect(CategoryFinder.getEnumByString("Capital")).toBe(Category.CAPITAL);
    expect(CategoryFinder.getEnumByString("Flag")).toBe(Category.FLAG);
    expect(CategoryFinder.getEnumByString("Map")).toBe(Category.MAP);
    expect(CategoryFinder.getEnumByString("Name+Capital")).toBe(Category.NAME_AND_CAPITAL);
  });

  test("getEnumByString should return undefined for invalid category name", () => {
    expect(CategoryFinder.getEnumByString("Invalid")).toBeUndefined();
    expect(CategoryFinder.getEnumByString("")).toBeUndefined();
  });

  test("getStringByEnum should return correct category name for valid enum value", () => {
    expect(CategoryFinder.getStringByEnum(Category.NAME)).toBe("Name");
    expect(CategoryFinder.getStringByEnum(Category.CAPITAL)).toBe("Capital");
    expect(CategoryFinder.getStringByEnum(Category.FLAG)).toBe("Flag");
    expect(CategoryFinder.getStringByEnum(Category.MAP)).toBe("Map");
    expect(CategoryFinder.getStringByEnum(Category.NAME_AND_CAPITAL)).toBe("Name+Capital");
  });

  test("getStringByEnum should return undefined for invalid enum value", () => {
    expect(CategoryFinder.getStringByEnum(99 as Category)).toBeUndefined();
  });
});
