#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("../app");
const debug = require('debug')('booking-app:server')
const http = require('http')
//const name = 'bookingApp';

/**
 * Get port and store in Express.
 */

const port = 8000;
app.set("port", port);

/**
 * Create HTTP server.
 */

 const server = http.createServer(app)
 .listen(port, onListening);


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
