const express = require('express');
const router = express.Router();
const reservations = require("../lib/reservations");
const debug = require('debug')('booking-app:route:admin') // eslint-disable-line no-unused-vars
const _ = require('lodash');


  /* GET admin listing. */
router.get('/', function(req, res, next) {
    reservations.fetch()
      .then(reservations => {
        res.render('admin', {
          title: 'Reservation App',
          reservations,
          header: _.keys(reservations[0])
        });
      })
  });

module.exports = router;