import express from 'express';
import { PlaceLoader } from './ressources/PlaceLoader';
import { Place } from './ressources/Place';


const app = express();
const port = 3000;

const loader : PlaceLoader = new PlaceLoader("../../../data");
const placesJson : Place[] = loader.loadPlaces();

app.get('/', (req, res) => {
  res.send(placesJson);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

