export interface Card {
  count: number;
  front: string;
  back: string;
  place: Place;
  finished: false;
}

export interface Place {
  id: number;
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tags: string[];
}
