# Notes

Install the dependencies in package.json

```shell
npm install
```

Install new dependency and add it to package.json

```shell
npm install <package name>
```

Start a new node project

```shell
npm init -y
```

Start the server

```shell
npm start
```

Run the tests

```shell
npm test
```

Transpile TS code to JS

```shell
npx tsc
```

Start a js file

```shell
node dist/app.js
```

## Curl commands to test API

```shell
curl -X POST http://localhost:3000/quiz \
     -H "Content-Type: application/json" \
     -d '{"tags": ["Oceans+Seas", "North_America"], "frontCategory": "Map", "backCategory": "Name+Capital"}'
```

```shell
curl -X POST http://localhost:3000/quiz \
     -H "Content-Type: application/json" \
     -d '{"tags": ["Continents"], "frontCategory": "Map", "backCategory": "Name+Capital"}'
```

```shell
curl -X GET http://localhost:3000/quiz/1/card
```

```shell
curl -X POST http://localhost:3000/quiz/1/guess \
     -H "Content-Type: application/json" \
     -d '{"guessed": true}'
```