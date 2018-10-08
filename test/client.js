const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost/test');

ws.on('open', function open() {
  var msg = JSON.stringify({msg: 'something', join: '002', room: '002'})
  ws.send(msg);
});

ws.on('message', function incoming(data) {
  console.log(data);
});