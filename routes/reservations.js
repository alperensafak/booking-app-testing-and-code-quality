const express = require("express");
const router = express.Router();
const debug = require("debug")("bookingApp:route:reservations");
const reservations = require("../lib/reservations");
const Reservation = require("../lib/schema/reservation");


router.post("/", function (req, res) {
  const reservation = new Reservation(req.body);
  reservations
    .create(reservation)
    .then((reservationId) =>
      res.json({
        success: true,
        reservationId,
      })
    )
    .catch((err) => {
      debug(err.message, req.body);
      res.status(400).json("reservations", {
        errors: [err.message],
        success: false,
        submission: req.body,
      });
    });
});

module.exports = router;
