# World Quiz

Projekt vom Modul Web Programming Lab.

## Data Source Quiz

- **Countries, Continents, Oceans and Seas**: Ultimate Geography v5.2 ([Anki Deck](https://ankiweb.net/shared/info/2109889812), [Github Page](https://github.com/anki-geo/ultimate-geography/tree/master))
- **USA States Capital**: Geo Data Viewer ([CSV File](https://github.com/RandomFractals/geo-data-viewer/blob/master/data/excel/usa-state-capitals.csv), [US States Wikipedia](https://en.wikipedia.org/wiki/U.S._state)) (CSV changed from original)
- **Canada Provinces and Territories**: ([Canada Provinces and Territories](https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada))

## Environment variables

Generate a `.env` file in the server (`touch server/.env`) and add following input to the file:

```txt
JWT_SECRET=<SECRET_STRING>
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb://mongo:27017/worldquiz
```

Generate the `<SECRET_STRING>` string with:

```shell
openssl rand -hex 32
```

## Deployment

```shell
docker compose build
```

```shell
docker compose up -d
```

```shell
docker compose down
```