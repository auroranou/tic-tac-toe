# Tic-tac-toe API

This is an API for finding the next move given a tic-tac-toe board. The app is hosted at https://young-coast-77703.herokuapp.com/.

Send a GET request with the `board` query string in order to receive the next move (the server always plays as o). E.g.: 
```
curl https://young-coast-77703.herokuapp.com/?board=+xxo++o++
```
will return `oxxo  o  `.

## Local development

This app uses Express to serve the endpoint and Jest for testing.

```javascript
yarn install
yarn start  // runs app at localhost:3000
yarn test   // runs jest task with --watch flag set
```