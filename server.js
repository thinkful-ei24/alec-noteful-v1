'use strict';

const express = require('express');
const app = express();
const data = require('./db/notes');
app.use(express.static('public'));

//http://127.0.0.1:8080/api/notes/?searchTerm=life
app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  const query = data.filter(data=>data.title.includes(searchTerm) || data.content.includes(searchTerm));
  res.json(query);
});

// INSERT EXPRESS APP CODE HERE...
app.get('/api/notes/:id', (req, res) => {
  const numId = Number(req.params.id);
  const query = data.find(data => data.id === numId);
  console.log(query);
  res.json(query);
});



app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
