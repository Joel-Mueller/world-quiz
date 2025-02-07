import express from 'express';
import { readPlaces } from './csv_reader';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(readPlaces());
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

