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

    var host = location.origin.replace(/^http/, 'ws');
    var client;
    var stream;

    recordButton.click(function() {
        if (!recording) {
            client = new BinaryClient(host);
            client.on('open', function() {
                stream = client.createStream();
                recording = true;
                recordButton.text('Stop');
                timer = setInterval(function() {
                    stream.write(context.getImageData(0, 0, canvas.width, canvas.height).data);
                }, frameDelay);
            });
        } else {
            recordButton.text('Processing...');
            clearInterval(timer);
            progressDiv.fadeIn();
            stream.end();

            client.on('open', function(stream, meta) {
                recordButton.text('Record');
                recording = false;
                progressDiv.fadeOut();
                progressbar.css('width', '0%').attr('aria-valuenow', 0);

                var displayImg = $('<img class="img-thumbnail">');
                displayImg.css('max-width', '100%');
                displayImg.css('max-height', '100%');
                displayImg.css('margin', '10px 00px 10px 00px');
                // displayImg.attr('src', reader.result);

                var link = $('<a target="_blank">');
                link.attr('href', imageUrl);
                displayImg.appendTo(link);

                var imageLinkDiv = $('#imageLinkDiv');
                if (!$.trim(imageLinkDiv.html()).length) {
                    var h3 = $('<h3>');
                    h3.html('Recordings');
                    h3.appendTo('#imageLinkDiv');
                }
                link.appendTo('#imageLinkDiv');
            });

            client.on('error', function(err) {
                alert('Problem saving video!');
                recording = false;
                recordButton.text('Record');
            });
        }
    });
});
