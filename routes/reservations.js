const express = require("express");
const router = express.Router();

const reservations = require("../lib/reservations");
const Reservation = require("../lib/schema/reservation");

router.get("/", function (req, res) {
  reservations.fetch().then((reservations) => {
    res.status(200).json(reservations);
  });
});

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
      res.status(400).json("reservations", {
        errors: [err.message],
        success: false,
        submission: req.body,
      });
    });
});

module.exports = router;
