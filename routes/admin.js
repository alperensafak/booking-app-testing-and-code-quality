const express = require('express');
const router = express.Router();
const reservations = require("../lib/reservations");
const debug = require('debug')('booking-app:route:admin') // eslint-disable-line no-unused-vars


/* GET admin listing. */
router.get("/", (req, res) => {
    reservations.fetch().then((reservations) => {
      res.status(200).json(reservations);
    });
  });


module.exports = router;