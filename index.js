var express = require('express');
var fs = require('fs');
var util = require('util')
// var ffmpeg = require('fluent-ffmpeg');
var bodyParser = require('body-parser');
// var BinaryServer = require('binaryjs').BinaryServer;
var http = require('http');
var app = express();
var port = process.env.PORT || 5000

var server = http.createServer(app).listen(port);

// var binaryserver = new BinaryServer({ server: server});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.render('index.html');
});

app.listen(app.get('port'), function() {
    console.log('Feedback Simulator is running at localhost:' + port);
});
