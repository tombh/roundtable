exports.handleWebsockets = function(socketServer) {
    // Connected knights
    var availableKnights = {}

    var connectionCounter = 0;

    // Function to broadcast to all connected knights
    socketServer.broadcast = function(json) {
      data = JSON.stringify(json)
      socketServer.clients.forEach(function(client) {
        client.send(data, function error(){
          console.log(error)
        })
      })
    }

    socketServer.on("connection", function(ws) {
      var connectionID = connectionCounter++;
      console.log("websocket connection open: " + connectionID)

      ws.on("message", function(data){
        json = JSON.parse(data)
        if(json['command'] == 'RECRUIT'){
          availableKnights[connectionID] = json['username']
          wss.broadcast({ knights: availableKnights })
        }
      })

      ws.on("close", function() {
        console.log("websocket connection close: " + connectionID)
        console.log(availableKnights.length)
        console.log(availableKnights)
        delete availableKnights[connectionID]
        console.log(availableKnights)
        console.log(availableKnights.length)
        wss.broadcast({ knights: availableKnights })
      })
    })
}