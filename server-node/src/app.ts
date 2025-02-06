import express from 'express';
import { PlaceReader } from './csv_reader';


const app = express();
const port = 3000;

let reader : PlaceReader = new PlaceReader()

app.get('/', (req, res) => {
  res.send(reader.hello());
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

