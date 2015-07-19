// function PNGSequence( canvas ){
//   this.canvas = canvas;
//   this.sequence = [];
// };
// PNGSequence.prototype.capture = function( fps ){
//   var cap = this;
//   this.sequence.length = 0;
//   this.timer = setInterval(function(){
//     cap.sequence.push(cap.canvas.toDataURL());
//   }, 1000/fps);
// };
// PNGSequence.prototype.stop = function(){
//   if (this.timer) clearInterval(this.timer);
//   delete this.timer;
//   return this.sequence;
// };

$( document ).ready(function() {
  var canvas = $('#feedback')[0];
  var context = canvas.getContext('2d');
  // var recorder = new PNGSequence( canvas );
  // var fingerprint = new Fingerprint({canvas: true}).get();
  var encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(17);

  var recording = false;
  var recordButton = $("#recordButton");
  var displayGif = $('#displayGif');
  var timer = null;
  recordButton.click(function() {
    if(!recording) {
      recording = true;
      encoder.start();
      recordButton.text("Stop");
      timer = setInterval(function() {
        encoder.addFrame(context);
      }, 17);
    } else {
      // recorder.stop();
      recordButton.text("Processing...");
      clearInterval(timer);
      encoder.finish();
      var binary_gif = encoder.stream().getData()
      var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
      displayGif.src = data_url;
      // var jsonData = JSON.stringify({ sequence: recorder.sequence })
      // var host = location.origin.replace(/^http/, 'ws')
      // var client = new BinaryClient(host);
      // client.on('open', function(stream) {
      //   var stream = client.createStream({ session_id: fingerprint });
      //
      //   stream.on('end', function() {
      //     window.location = 'get-video/' + fingerprint + '.avi';
      //     recordButton.text('Record');
      //     recording = false;
      //   });
      //
      //   stream.on('error', function(err) {
      //     alert("Problem saving video!");
      //     recording = false;
      //     recordButton.text("Record");
      //   });
      //
      //   stream.write(jsonData);
      //   stream.write(null);
      // });
      //
      // client.on('error', function(err) {
      //   alert("Problem saving video!");
      //   recording = false;
      //   recordButton.text("Record");
      // });
    }
  });
});
