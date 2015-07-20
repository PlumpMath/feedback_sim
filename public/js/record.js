$( document ).ready(function() {
  var canvas = $('#feedback')[0];
  var context = canvas.getContext('2d');
  var frameDelay = 1000/30

  var recording = false;
  var timer = null;
  var frames = [];

  var recordButton = $("#recordButton");
  var progressbar = $('.progress-bar');
  var progressDiv = $('.progress');
  progressDiv.hide();

  recordButton.click(function() {
    if(!recording) {
      gif = new GIF({
        quality: 35,
        workers: 4,
        width: canvas.width,
        height: canvas.height,
        workerScript: 'js/gif.worker.js'
      });
      recording = true;
      recordButton.text("Stop");
      timer = setInterval(function() {
        gif.addFrame(context, {
          copy: true,
          delay: frameDelay
        });
      }, frameDelay);
    } else {
      recordButton.text("Processing...");
      clearInterval(timer);
      progressDiv.fadeIn();
      gif.on('progress', function(progress) {
        progressbar.css('width', progress*100 + '%').attr('aria-valuenow', progress*100);
        progressbar.html(Math.ceil(progress*100) + '%');
      });
      gif.on('finished', function(blob) {
        recordButton.text('Record');
        recording = false;
        progressDiv.fadeOut();
        progressbar.css('width', '0%').attr('aria-valuenow', 0);
        // var urlCreator = window.URL || window.webkitURL;
        // var imageUrl = urlCreator.createObjectURL(blob);
        // image.onload = function() {
        //   urlCreator.revokeObjectURL(imageUrl);
        // };
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          var wrapper = $('<a target="_blank">');
          wrapper.attr('href', reader.result);

          var displayImg = $('<img class="img-thumbnail">');
          displayImg.css('max-width', '100%');
          displayImg.css('max-height', '100%');
          displayImg.css('margin', '10px 00px 10px 00px');
          displayImg.attr('src', reader.result);

          displayImg.appendTo(wrapper);
          $('<br>').appendTo(wrapper);
          wrapper.appendTo('#imageDiv');
        };
      });
      gif.render();
    }
  });
});
