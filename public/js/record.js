function PNGSequence( canvas ){
  this.canvas = canvas;
  this.sequence = [];
};
PNGSequence.prototype.capture = function( fps ){
  var cap = this;
  this.sequence.length = 0;
  this.timer = setInterval(function(){
    cap.sequence.push(cap.canvas.toDataURL());
  }, 1000/fps);
};
PNGSequence.prototype.stop = function(){
  if (this.timer) clearInterval(this.timer);
  delete this.timer;
  return this.sequence;
};

$( document ).ready(function() {
  var canvas = $('#feedback')[0];
  var recorder = new PNGSequence( canvas );
  var fingerprint = new Fingerprint({canvas: true}).get();

  var recording = false;
  var recordButton = $("#recordButton");
  recordButton.click(function() {
    if(!recording)
    {
      recording = true;
      recorder.capture(30);
      recordButton.text("Stop");
    }
    else
    {
      recorder.stop();
      recordButton.text("Processing...");
      var jsonData = JSON.stringify({ sequence: recorder.sequence })
      var hostname = window.location.hostname;
      var client = new BinaryClient('ws://' + hostname + ':9000/');
      client.on('open', function(stream) {
        var stream = client.createStream({ session_id: fingerprint });

        stream.on('end', function() {
          window.location = 'get-video/' + fingerprint + '.avi';
          recordButton.text('Record');
          recording = false;
        });

        stream.on('error', function(err) {
          alert("Problem saving video!");
          recording = false;
          recordButton.text("Record");
        });

        stream.write(jsonData);
        stream.write(null);
      });

      client.on('error', function(err) {
        alert("Problem saving video!");
        recording = false;
        recordButton.text("Record");
      });
      /*$.ajax(
        {
          method: "POST",
          url: "/save-video/"+fingerprint,
          contentType: "application/json",
          data: jsonData,
          cache: false
        },
        function(data) {
          $("#download_iframe").src = data.url;
      })
        .error(function() {
          alert("Problem saving video!");
        })
        .always(function() {
          recording = false;
          recordButton.text("Record");
        });*/
    }
  });
});