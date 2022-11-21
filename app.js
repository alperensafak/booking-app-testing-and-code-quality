/**
 * Module dependencies.
 */

const express = require("express");
const app = express();

/**
 * Get port and store in Express.
 */
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

/**
 * Listen for connections on the specified port.
 */

app.listen(port);
