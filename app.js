var io = require('socket.io'); // useless at the moment

var express = require('express'); // à utiliser/mélanger plus tard avec socket.io
var app = express(); // express est comme une librairie, il faut l'instancier une fois

// var app = require('express')();
// Même chose que les 2 lignes au dessus

var http = require('http').Server(app);

// Quand on est sur la racine, j'envoie le fichier index.html
app.get('/', function(req, res){
	// Je dois donner le chemin complet vers le fichier
	// __dirname is like __FILE__ in php
	// Double underscore est une superglobale
	res.sendFile(__dirname + '/index.html');
})

http.listen(3000, function(){
	console.log('listening on *:3000')
});
