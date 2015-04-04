var WebSocketServer = require("ws").Server

exports.handleWebsockets = function(server) {
  var socketServer = new WebSocketServer({server: server})

  // Connected knights
  var availableKnights = {}
  var liveConnections = [];
  // Knight on the watch
  var onTheWatch = false;

  var connectionCounter = 0;

  // Function to broadcast to all connected knights
  socketServer.broadcast = function(json) {
    data = JSON.stringify(json)
    socketServer.clients.forEach(function(client) {
      client.send(data, function error() {
        console.log(error);
      })
    })
  }

  socketServer.on("connection", function(ws) {
    var connectionID = connectionCounter++
    console.log("websocket connection open: " + connectionID);
    //The first knight to connect is assigned to the watch
    if (!onTheWatch) {
      onTheWatch = connectionID;
      console.log("[Conn:" + connectionID + "] is on the watch.");
    }

    ws.on("message", function(data) {
      json = JSON.parse(data);
      if (json['command'] == 'RECRUIT') {
        availableKnights[connectionID] = json['username'];
        liveConnections.push(connectionID);
        socketServer.broadcast({
          knights: availableKnights,
          on_the_watch: onTheWatch
        });
      }

      if (json['command'] == 'WATCH_PASS') {
        onTheWatch = liveConnections[Math.floor(Math.random() * liveConnections.length)];
        socketServer.broadcast({
          knights: availableKnights,
          on_the_watch: onTheWatch
        });
      }
    })

    ws.on("close", function() {
      console.log("websocket connection close: " + connectionID);

      delete availableKnights[connectionID];

      var i = liveConnections.indexOf(connectionID);
      delete liveConnections[i];

      if (connectionID === onTheWatch) {
        onTheWatch = liveConnections[Math.floor(Math.random() * liveConnections.length)];
      }

      socketServer.broadcast({
        knights: availableKnights,
        on_the_watch: onTheWatch
      });
    })
  })
}
