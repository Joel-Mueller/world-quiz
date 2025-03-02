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