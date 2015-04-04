var VERSION = '0.0.0'

var WebSocketServer = require("ws").Server
var cors = require('cors')
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(cors())
app.use(express.static(__dirname + "/public"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

// Connected knights
var availableKnights = {}

var connectionCounter = 0;

// Function to broadcast to all connected knights
wss.broadcast = function(json) {
  data = JSON.stringify(json)
  wss.clients.forEach(function(client) {
    client.send(data, function error(){
      console.log(error)
    })
  })
}

wss.on("connection", function(ws) {
  var connectionID = connectionCounter++
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
