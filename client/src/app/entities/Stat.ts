import { Category } from './Category';
import { Tag } from './Tag';

export interface Stat {
  date: Date;
  front: Category;
  back: Category;
  tags: Tag[];
  attempts: Record<number, number>;
}

export class StatFormatter {
  static toString(stat: Stat): string {
    const date = stat.date instanceof Date ? stat.date : new Date(stat.date);
    const formattedDate = date.toISOString().split('T')[0];
    const frontCategory = Category[stat.front];
    const backCategory = Category[stat.back];
    const tags = stat.tags.map((tag) => Tag[tag]).join(', ');

    const totalCardsSelected = Object.keys(stat.attempts).length;
    const totalCardsGuessed = Object.values(stat.attempts).reduce(
      (sum, val) => sum + val,
      0
    );

    const attempts = Object.entries(stat.attempts)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    return `Stat { date: ${formattedDate}, front: ${frontCategory}, back: ${backCategory}, tags: [${tags}], cards selected: { ${totalCardsSelected} }, cards guessed: { ${totalCardsGuessed} } }`;
  }
}
