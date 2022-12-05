const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Reservation App' });
  });

  router.delete('/', function(req, res, next) {
    res.end(500);
  });


module.exports = router;