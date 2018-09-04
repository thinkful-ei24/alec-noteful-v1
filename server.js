'use strict';

const express = require('express');
const data = require('./db/notes');
const app = express();

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
