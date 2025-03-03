import { Category } from './Category';

export interface Stat {
  front: Category;
  back: Category;
  attempts: Record<number, number>;
}