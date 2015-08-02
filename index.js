var express = require('express');
var fs = require('fs');
var util = require('util')
var bodyParser = require('body-parser');
var BinaryServer = require('binaryjs').BinaryServer;
var http = require('http');
var uuid = require('node-uuid');
var GIFEncoder = require('gifencoder');
var app = express();
var port = process.env.PORT || 5000

var server = http.createServer(app).listen(port);

var binaryserver = new BinaryServer({server: server});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.render('index.html');
});

var getSessionId = function() {
    return uuid.v4();
};

binaryserver.on('connection', function(client) {
    client.on('stream', function(stream) {
        var sessionId = getSessionId();

        var encoder = new GIFEncoder(600, 600);
        // encoder.createReadStream().pipe(fs.createWriteStream(sessionId + '.gif'));

        stream.pipe(encoder.createWriteStream({
            repeat: 0,
            frameRate: 30,
            quality: 30
        })).pipe(fs.createWriteStream(sessionId + '.gif'));

        // stream.on('data', function(chunk) {
        //     console.log(chunk);
        // });

        stream.on('end', function() {
            var stream = client.createStream({sessionId: sessionId});
            stream.end();
        });
    });

    client.on('close', function() {

    });
});

app.get('/get-video/:session_id/', function(request, response) {
    var session_id = request.params.session_id.split('.')[0];

    response.writeHead(200, 'video/msvideo');

    var fileStream = fs.createReadStream('video-' + session_id + '.avi');
    fileStream.pipe(response);
});

app.listen(app.get('port'), function() {
    console.log('Feedback Simulator is running at localhost:' + port);
});
