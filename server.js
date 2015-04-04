var VERSION = '0.0.0'

var http    = require('http'),
    express = require('express'),
    app     = express(),
    server  = http.createServer(app),
    f       = require('./inc/functions.js'),
    port    = f.getConfig().httpPort;

//Output the console ASCII art
f.ascii(f);

//Initiate LumberJack for logging with winston
f.setupLumberJack(f);

//Initalise middleware
f.enableMiddleware(app);

//Deals with routing and general logic
f.handleWebsockets(server);

//Start the HTTP server on the port specified, defaults to 1337
server.listen(port, function () {
  f.getLumberJack().info("Listening at wss://" + f.getConfig().httpHost + ":" + String(port).rainbow);
});
