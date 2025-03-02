# World Quiz

Projekt vom Modul Web Programming Lab.

## Data Source

Anki Deck to download --> https://ankiweb.net/shared/info/2109889812
Github from the user --> https://github.com/anki-geo/ultimate-geography/tree/master

## TODO

- [ ] Daily with 20 of the day or so
- [ ] Testing
- [ ] Navigation (Login/Dashboard, Quiz)
- [ ] Add US States, Canada, Australia and Switzerland

## Envorinment Variables

## Environment variables

Example

```txt
JWT_SECRET=<secure random string>
PORT=3000
```

Generate a secure random string with:

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