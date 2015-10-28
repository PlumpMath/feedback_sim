$(document).ready(function() {
    var canvas = $('#feedback')[0];
    var context = canvas.getContext('2d');
    var frameDelay = 1000 / 30;

    var recording = false;
    var timer = null;
    var frames = [];

    var recordButton = $('#recordButton');
    var progressbar = $('.progress-bar');
    var progressDiv = $('.progress');
    progressDiv.hide();

    recordButton.click(function() {
        if (!recording) {
            gif = new GIF({
                quality: 45,
                workers: 4,
                width: canvas.width,
                height: canvas.height,
                workerScript: 'js/gif.worker.js'
            });
            recording = true;
            recordButton.text('Stop');
            timer = setInterval(function() {
                gif.addFrame(context, {
                    delay: frameDelay,
                    copy: true
                });
            }, frameDelay);
        } else if (recordButton.text() != 'Processing...') {
            recordButton.text('Processing...');
            clearInterval(timer);
            progressDiv.fadeIn();
            gif.on('progress', function(progress) {
                progressbar.css('width', progress * 100 + '%').attr('aria-valuenow', progress * 100);
                progressbar.html(Math.ceil(progress * 100) + '%');
            });
            gif.on('finished', function(blob) {
                recordButton.text('Record');
                recording = false;
                progressDiv.fadeOut();
                progressbar.css('width', '0%').attr('aria-valuenow', 0);
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                var displayImg = $('<img class="img-thumbnail">');
                displayImg.css('width', '200px');
                displayImg.css('height', '200px');
                displayImg.css('margin', '10px');
                displayImg.attr('src', imageUrl);

                var link = $('<a target="_blank">');
                link.attr('href', imageUrl);
                displayImg.appendTo(link);

                var imageLinkDiv = $('#imageLinkDiv');
                if (!$.trim(imageLinkDiv.html()).length) {
                    imageLinkDiv.addClass('well');
                    var h3 = $('<h2>');
                    h3.html('Recordings');
                    h3.appendTo('#imageLinkDiv');
                }
                link.appendTo('#imageLinkDiv');
            });
            gif.render();
        }
    });
});
