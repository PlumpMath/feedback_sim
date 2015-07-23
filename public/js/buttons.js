var processingInstance;

$(document).ready(function() {
    getProcessingInstance();
});

function getProcessingInstance() {
    var bound = false;
    processingInstance = Processing.getInstanceById('feedback');
    if (processingInstance != null) {
        bound = true;
    }
    if (!bound) {
        setTimeout(getProcessingInstance, 250);
    } else {
        bindButtons();
        addListeners();
    }
};

function addListeners() {
    var canvas = document.getElementById("feedback");

    document.addEventListener('keydown', function(event) {
        event.preventDefault();
        var newEvent = document.createEvent('KeyboardEvent');
        (newEvent.initKeyEvent || newEvent.initKeyboardEvent)('keydown', true, true, window,
            0, 0, 0, 0,
            0, event.keyCode);
        canvas.dispatchEvent(newEvent);
    }, true);
    document.addEventListener('keyup', function(event) {
        event.preventDefault();
        var newEvent = document.createEvent('KeyboardEvent');
        (newEvent.initKeyEvent || newEvent.initKeyboardEvent)('keyup', true, true, window,
            0, 0, 0, 0,
            0, event.keyCode);
        canvas.dispatchEvent(newEvent);
    }, true);
}

function bindButtons() {
    $("#rotateLeftButton").mousedown(function() { processingInstance.leftPressed(); });
    $("#rotateLeftButton").mouseup(function() { processingInstance.leftReleased(); });
    $("#rotateRightButton").mousedown(function() { processingInstance.rightPressed(); });
    $("#rotateRightButton").mouseup(function() { processingInstance.rightReleased(); });

    $("#scaleUpButton").mousedown(function() { processingInstance.upPressed(); });
    $("#scaleUpButton").mouseup(function() { processingInstance.upReleased(); });
    $("#scaleDownButton").mousedown(function() { processingInstance.downPressed(); });
    $("#scaleDownButton").mouseup(function() { processingInstance.downReleased(); });

    $("#resetScaleButton").click(function() { processingInstance.resetScale(); });

    $("#colorCheckbox").change(function() { processingInstance.toggleColorStep(); });
    $("#autoCheckbox").change(function() { processingInstance.toggleAuto(); });
    $("#shapeCheckbox").change(function() { processingInstance.toggleDrawShape(); });
    $("#circleRadioButton").change(function() { processingInstance.toggleSquare(); });
    $("#squareRadioButton").change(function() { processingInstance.toggleSquare(); });

    $("#invertButton").click(function() { processingInstance.invert(); });
    $("#resetButton").mousedown(function() { processingInstance.resetPressed(); });
    $("#resetButton").mouseup(function() { processingInstance.resetReleased(); });

    $("#saveButton").click(function() { processingInstance.saveImage(); });
};
