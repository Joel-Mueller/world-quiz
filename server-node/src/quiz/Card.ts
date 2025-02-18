import { Category } from "../ressources/Category";
import { Place } from "../ressources/Place";

export interface Card {
  count: number;
  front: string;
  back: string;
  place?: Place;
  finished: boolean;
}