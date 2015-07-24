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
    client.on('stream', function(stream, meta) {
        var sessionId = getSessionId();
        
        var encoder = new GIFEncoder(600, 600);
        encoder.createReadStream().pipe(fs.createWriteStream(sessionId + '.gif'));

        encoder.start();
        encoder.setRepeat(0);
        encoder.setFrameRate(30);
        encoder.setQuality(30);

        var jsonData = ""
        stream.on('data', function(chunk) {
            if (chunk != null) {
                jsonData += chunk;
            } else {
                var frameSequence = JSON.parse(jsonData).sequence;
                frameSequence.forEach(function(data, index) {
                    var imageData = data.replace(/^data:image\/png;base64,/,"");
                    encoder.addFrame(new Buffer(imageData, 'base64'));
                });

                encoder.finish();

                stream.end();
            }
        });
    });

    client.on('close', function() {

    });
});

app.get('/get-video/:session_id/', function(request, response) {
    var session_id = request.params.session_id.split('.')[0];

    response.writeHead(200, "video/msvideo");

    var fileStream = fs.createReadStream('video-' + session_id + '.avi');
    fileStream.pipe(response);
});

setInterval(function() {
    console.log("start");
    fs.readdir(".", function(error, list) {
        list.forEach(function(file) {
            var extension = file.split('.')[1];
            if (extension == "avi" || extension == "png") {
                fs.unlinkSync(file);
            }
        });
    });
}, 3600000);

app.listen(app.get('port'), function() {
    console.log("Feedback Simulator is running at localhost:" + port);
});
