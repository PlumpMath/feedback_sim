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

// binaryserver.on('connection', function(client) {
// 	session_id = "";
// 	client.on('stream', function(stream, meta) {
// 		session_id = meta.session_id;
// 		jsonData = ""
// 		stream.on('data', function(chunk) {
// 			if(chunk != null)
// 				jsonData += chunk;
// 			else
// 			{
// 				var pngSequence = JSON.parse(jsonData).sequence;
//
// 				pngSequence.forEach(function(image, index) {
// 					var data = image.replace(/^data:image\/png;base64,/,"");
// 					var indexString = String("0000" + index).slice(-4);
// 					fs.writeFile('image-' + session_id + '-' + indexString + '.png', data, "base64", function(err) {
//
// 					});
// 				});
//
// 				var command = new ffmpeg('image-' + session_id + '-%04d.png')
// 					.withSize('600x600')
// 					.withFps(30)
// 					.withFpsOutput(30)
// 					.toFormat('avi')
// 					.on('error', function(err) {
// 						console.log(err);
// 					})
// 					.on('end', function() {
// 						stream.end();
// 					})
// 					.saveToFile('video-' + session_id + '.avi');
// 			}
// 		});
// 	});
//
// 	client.on('close', function() {
//
// 	});
// });
//
// app.get('/get-video/:session_id/', function(request, response) {
// 	var session_id = request.params.session_id.split('.')[0];
//
// 	response.writeHead(200, "video/msvideo");
//
//     var fileStream = fs.createReadStream('video-' + session_id + '.avi');
//     fileStream.pipe(response);
// });
//
// setInterval(function() {
// 	console.log("start");
// 	fs.readdir(".", function(error, list) {
// 		list.forEach(function(file) {
// 			var extension = file.split('.')[1];
// 			if(extension == "avi" || extension == "png")
// 			{
// 				fs.unlinkSync(file);
// 			}
// 		});
// 	});
// }, 3600000);

app.listen(app.get('port'), function() {
  console.log("Feedback Simulator is running at localhost:" + port);
});
