const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

let PORT = 80;


var key = fs.readFileSync(__dirname + '/certs/localhost.key');
var cert = fs.readFileSync(__dirname + '/certs/localhost.crt');
var options = {
  // key: key,
  // cert: cert,
  // autoRewrite: true,
  // changeOrigin: true,
  // ws: true

};

app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', express.static(__dirname + '/public'));

var server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log("server starting on port : " + PORT)
});

// Create a server for handling websocket calls
const wss = new WebSocketServer({server: server});

// ----------------------------------------------------------------------------------------

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    // Broadcast any received message to all clients
    console.log('received: %s', message);
    wss.broadcast(message);
  });
});

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
