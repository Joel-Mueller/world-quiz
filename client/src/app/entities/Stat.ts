import { Category } from './Category';
import { Tag } from './Tag';

export interface Stat {
  date: Date;
  front: Category;
  back: Category;
  tags: Tag[];
  attempts: Record<number, number>;
}