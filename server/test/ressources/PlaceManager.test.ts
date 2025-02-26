import { PlaceManager } from "../../src/ressources/PlaceManager";
import { Place } from "../../src/ressources/Place";
import { Tag } from "../../src/ressources/Tag";
import { Category } from "../../src/ressources/Category";

jest.mock("../../src/ressources/PlaceLoader", () => {
  return {
    PlaceLoader: jest.fn().mockImplementation(() => {
      return {
        loadPlaces: jest.fn().mockReturnValue([
          { id: 0, name: "England", info: "Constituent country of the UK.", capital: "London", flag: "ug-flag-england.svg", map: "ug-map-england.png", tags: ["Europe"] },
          { id: 1, name: "Scotland", info: "Constituent country of the UK.", capital: "Edinburgh", flag: "ug-flag-scotland.svg", map: "ug-map-scotland.png", tags: ["Europe"] },
          { id: 317, name: "Sea of Okhotsk", map: "ug-map-sea_of_okhotsk.png", tags: ["Oceans+Seas"] }, // No capital, flag, or info
          { id: 318, name: "Timor Sea", map: "ug-map-timor_sea.png", tags: ["Oceans+Seas"] }, // No capital, flag, or info
        ] as Place[]),
      };
    }),
  };
});

describe("PlaceManager", () => {
  let placeManager: PlaceManager;

  beforeEach(() => {
    placeManager = new PlaceManager("dummyPath");
  });

  test("getAllPlaces returns all places", () => {
    const places = placeManager.getAllPlaces();
    expect(places.length).toBe(4);
  });

  test("filterCategory - NAME filters places with names", () => {
    const places = placeManager.getAllPlaces();
    const filtered = (placeManager as any).filterCategory(Category.NAME, places);
    expect(filtered.length).toBe(4); // All have names
    expect(filtered.map((p: Place) => p.name)).toEqual(expect.arrayContaining(["England", "Scotland", "Sea of Okhotsk", "Timor Sea"]));
  });

  test("filterCategory - CAPITAL filters places with capitals", () => {
    const places = placeManager.getAllPlaces();
    const filtered = (placeManager as any).filterCategory(Category.CAPITAL, places);
    expect(filtered.length).toBe(2); // Only England and Scotland
    expect(filtered.map((p: Place) => p.capital)).toEqual(expect.arrayContaining(["London", "Edinburgh"]));
  });

  test("filterCategory - FLAG filters places with flags", () => {
    const places = placeManager.getAllPlaces();
    const filtered = (placeManager as any).filterCategory(Category.FLAG, places);
    expect(filtered.length).toBe(2); // Only England and Scotland have flags
    expect(filtered.map((p: Place) => p.flag)).toEqual(expect.arrayContaining(["ug-flag-england.svg", "ug-flag-scotland.svg"]));
  });

  test("filterCategory - MAP filters places with maps", () => {
    const places = placeManager.getAllPlaces();
    const filtered = (placeManager as any).filterCategory(Category.MAP, places);
    expect(filtered.length).toBe(4); // All places have maps
    expect(filtered.map((p: Place) => p.map)).toEqual(expect.arrayContaining([
      "ug-map-england.png",
      "ug-map-scotland.png",
      "ug-map-sea_of_okhotsk.png",
      "ug-map-timor_sea.png"
    ]));
  });

  test("filterCategory - NAME_AND_CAPITAL filters places with both names and capitals", () => {
    const places = placeManager.getAllPlaces();
    const filtered = (placeManager as any).filterCategory(Category.NAME_AND_CAPITAL, places);
    expect(filtered.length).toBe(4); // All have names (capital is optional)
    expect(filtered.map((p: Place) => p.name)).toEqual(expect.arrayContaining(["England", "Scotland", "Sea of Okhotsk", "Timor Sea"]));
  });

  test("getWithFilter - filters by tag and category", () => {
    const places = placeManager.getWithFilter([Tag.EUROPE], Category.NAME, Category.FLAG);
    expect(places.length).toBe(2); // England and Scotland match both NAME and FLAG
    expect(places.map((p: Place) => p.name)).toEqual(expect.arrayContaining(["England", "Scotland"]));
  });

  test("getWithFilter - filters places that do not have required fields", () => {
    const places = placeManager.getWithFilter([Tag.OCEANS_AND_SEAS], Category.NAME, Category.FLAG);
    expect(places.length).toBe(0); // Sea of Okhotsk and Timor Sea lack flags
  });
});
