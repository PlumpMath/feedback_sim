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

    window.addEventListener('keydown', function(event) {
        processingInstance.keyPressed(event.keyCode);
    }, true);
    window.addEventListener('keyup', function(event) {
        processingInstance.keyReleased(event.keyCode);
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
