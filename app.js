var express = require('express');
var app = express();
var choices = require('./choices.json');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//------

var votes = null;

// Réinitialise la variable start et doit afficher 
var start = function (socket) {
	// Tire dans choices.json
	var rand = Math.floor(Math.random() * choices.length);
	console.log(choices[rand]);

	// Stocke les images dans choices
  	votes =  choices[rand];

  	// event_name -> votes // event-value --> choices[rand]
	io.sockets.emit('votes', votes);
  	votes.left.total = 0;
  	votes.right.total = 0;
};

// Actualise toutes les 3 secondes 
setInterval(function(){
	start();
}, 3000);
// Pour que le message s'affiche immédiatement. Ne pas avoir à attendre 3sec
start();


//--------------------

io.on('connection', function(socket){
  // send all data
  socket.emit('votes', votes);

  socket.on('choice', function(what){
    //console.log('vote');
    if (what === 'left') {
      votes.left.total++;
    } else {
      votes.right.total++;
    }
    io.sockets.emit('total', votes);
  });

  socket.on('unchoice', function(what){
  	//console.log('unvote')
    if (what === 'left') {
      votes.left.total--;
    } else {
      votes.right.total--;
    }
    io.sockets.emit('total', votes);
  });



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});