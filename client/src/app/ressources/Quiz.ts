import { Category } from './Category';
import { Place } from './Place';

export interface Quiz {
  front: Category;
  back: Category;
  places: Place[];
}
