
const { PORT } = require('./config');
const morgan = require('morgan');
const {LOGGER} = require('./middleware/logger');
const express = require('express');

const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const app = express();
app.use(morgan(LOGGER));
app.use(express.static('public'));
app.use(express.json());



//http://127.0.0.1:8080/api/notes/?searchTerm=life
app.get('/api/notes', (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  notes.ourFilter(searchTerm, (err, list) => {
   if (err) {
     return next(err); // goes to error handler
   }
   res.json(list); // responds with filtered array
 });
});

// INSERT EXPRESS APP CODE HERE...
app.get('/api/notes/:id', (req, res, next) => {
  const numId = req.params.id;
  notes.ourFind(numId, (err, item)=>{
    if(err){
      return next(err);
    }
    res.json(item);
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.ourUpdate(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});


app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
