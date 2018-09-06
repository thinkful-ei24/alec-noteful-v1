const express = require('express');
const router = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  notes.ourFilter(searchTerm, (err, list) => {
   if (err) {
     return next(err); // goes to error handler
   }
   res.json(list); // responds with filtered array
 });
});

router.get('/notes/:id', (req, res, next) => {
  const numId = req.params.id;
  notes.ourFind(numId, (err, item)=>{
    if(err){
      return next(err);
    }
    res.json(item);
  });
});

router.put('notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

router.ourUpdate(id, updateObj, (err, item) => {
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

module.exports = router;
