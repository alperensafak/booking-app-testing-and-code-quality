/**
 * Module dependencies.
 */

const express = require("express");
const app = express();
const reservations = require("./routes/reservations");
var cookieParser = require("cookie-parser");

const configuration = {};

// /**
//  * Get port and store in Express.
//  */
// const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/reservations", reservations);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in test
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "test" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
