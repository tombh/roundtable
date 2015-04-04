var WebSocketServer = require('ws').Server,
    http            = require('http'),
    express         = require('express'),
    f               = require('./inc/functions.js'),
    app             = express(),
    server          = http.createServer(app),
    wss             = new WebSocketServer({server: server}),
    port            = process.argv.splice(2)[0] || f.getConfig().httpPort || 1337;

//Output the console ASCII art
f.ascii(f);

//Initiate LumberJack for logging with winston
f.setupLumberJack(f);

//Initalise middleware
f.enableMiddleware(app);

//Deals with routing and general logic
f.handleWebsockets(wss);

//Start the HTTP server on the port specified, defaults to 1337
server.listen(port, function () {
    f.getLumberJack().info("[Instance]".red + " RoundTable is listening at wss://" + f.getConfig().httpHost + ":" + String(port).rainbow);
});