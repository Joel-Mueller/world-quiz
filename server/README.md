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

Register a user

```shell
curl -X POST http://localhost:3000/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
```

login to get jwt

```shell
curl -X POST http://localhost:3000/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
```

access secret

```shell
curl -X GET http://localhost:3000/protected \
     -H "Authorization: Bearer <TOKEN>"
```

## Run Server locally

Environment variables

```txt
JWT_SECRET=<SECRET_STRING>
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb://localhost:27017/worldquiz
```

Docker compose variables

```yml
version: '3.8'

services:
  mongo:
    image: mongo:6
    restart: always
    environment:
      MONGO_INITDB_DATABASE: worldquiz
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_MONGODB_PORT: 27017
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: password
    depends_on:
      - mongo

volumes:
  mongo_data:
```