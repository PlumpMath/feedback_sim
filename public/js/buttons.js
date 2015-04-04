var processingInstance;

$( document ).ready(function() {
	getProcessingInstance();
});

function getProcessingInstance() {
	var bound = false;
	processingInstance = Processing.getInstanceById('feedback');
	if(processingInstance != null)
		bound = true;
	if(!bound)
		setTimeout(getProcessingInstance, 250);
	else
		bindButtons();
};

function bindButtons() {
	$("#rotateLeftButton").mousedown(processingInstance.leftPressed);
	$("#rotateLeftButton").mouseup(processingInstance.leftReleased);
	$("#rotateRightButton").mousedown(processingInstance.rightPressed);
	$("#rotateRightButton").mouseup(processingInstance.rightReleased);

	$("#scaleUpButton").mousedown(processingInstance.upPressed);
	$("#scaleUpButton").mouseup(processingInstance.upReleased);
	$("#scaleDownButton").mousedown(processingInstance.downPressed);
	$("#scaleDownButton").mouseup(processingInstance.downReleased);
};