import express from 'express';
import { PlaceLoader } from './ressources/PlaceLoader';
import { Place } from './ressources/Place';
import { PlaceManager } from './ressources/PlaceManager';
import { Tag } from './ressources/Tag';
import { Category } from './ressources/Category';


const app = express();
const port = 3000;
const pathToData: string = "../../../data"

const placeManager : PlaceManager = new PlaceManager(pathToData);

app.get('/', (req, res) => {
  let tags : Tag[] = [];
  tags.push(Tag.OCEANS_AND_SEAS);
  tags.push(Tag.NORTH_AMERICA);
  res.send(placeManager.getWithFilter(tags, Category.MAP, Category.NAME));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

