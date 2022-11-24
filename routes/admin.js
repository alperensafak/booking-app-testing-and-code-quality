const express = require('express');
const router = express.Router();
const reservations = require("../lib/reservations");


/* GET admin listing. */
router.get("/", (req, res) => {
    reservations.fetch().then((reservations) => {
      res.status(200).json(reservations);
    });
  });


module.exports = router;