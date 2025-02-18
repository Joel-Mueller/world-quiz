export enum Category {
  NAME = 1,
  CAPITAL = 2,
  FLAG = 3,
  MAP = 4,
  NAME_AND_CAPITAL = 5,
}

const categoryMap: Record<string, Category> = {
  "Name": Category.NAME,
  "Capital": Category.CAPITAL,
  "Flag": Category.FLAG,
  "Map": Category.MAP,
  "Name+Capital": Category.NAME_AND_CAPITAL,
};

export class CategoryFinder {
  static getEnumByString(categoryName: string): Category | undefined {
    return categoryMap[categoryName];
  }

  static getStringByEnum(categoryValue: Category): string | undefined {
    return Object.keys(categoryMap).find((key) => categoryMap[key] === categoryValue);
  }
}