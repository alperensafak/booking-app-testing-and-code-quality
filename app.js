/**
 * Module dependencies.
 */

const express = require("express");
const app = express();
const index = require('./routes/index');
const admin = require("./routes/admin")
const reservations = require("./routes/reservations");
const cookieParser = require("cookie-parser");
const auth = require('./lib/middleware/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/",index)
// Impenetrable security.
app.use('/admin', auth('admin', 'admin'))
app.use('/admin', admin);
app.use("/reservations", reservations);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  // set locals, only providing error in test
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "test" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
