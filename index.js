const WebSocket = require('ws');
const http=require('http');

const express = require('express');
const app = express();

app.use(express.static('public'));
const bserver=http.createServer(app);
const webPort = 80;

bserver.listen(webPort, function(){
  console.log('Web server start. http://localhost:' + webPort );
});
const wss=new WebSocket.Server({server: bserver});

wss.on('connection',ws=>{

    ws.room=[];
    ws.send(JSON.stringify({msg: "user joined"}));
    console.log('connected');
    ws.on('message', message=>{
        console.log('message: ', message);
        // try{
        var messag=JSON.parse(message);
        // }catch(e){console.log(e)}
        if(messag.join){ws.room.push(messag.join)}
        if(messag.room){broadcast(message);}
        if(messag.msg){console.log('message: ',messag.msg)}
    })

    ws.on('error',e=>console.log(e))
    ws.on('close',(e)=>console.log('websocket closed'+e))

})

function broadcast(message){
    wss.clients.forEach(client=>{
        if(client.room.indexOf(JSON.parse(message).room)>-1){
            client.send(message)
        }
    })
}