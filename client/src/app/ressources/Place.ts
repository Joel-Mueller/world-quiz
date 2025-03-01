import { Tag } from "./Tag";

export interface Place {
  id: number;
  name: string;
  info?: string;
  capital?: string;
  capitalInfo?: string;
  flag?: string;
  map: string;
  tags: Tag[];
}
