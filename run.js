//buttons
var startButton = document.getElementById('start');
var stepButton = document.getElementById('step');
var resetButton = document.getElementById('reset');
var initializeButton = document.getElementById('initialize');
var pauseButton = document.getElementById('pause');

var powerRadioButton = document.getElementById('power');
var comparisonRadioButton = document.getElementById('comparison');

var tapeRunningSpeed = 0;

var origX;
var origY;

//text fields
var xField = document.getElementById("x-value");
var yField = document.getElementById("y-value");
var speedField = document.getElementById("speed");

//global variables
var operationOption = 0;
var inputTape = [];
var readingHeadIndex = 0;
var currentState = 0;
var symbolId = 0;
var machineInitialized = false;

var startSymbolAttached = false;
var iterations = 0;	

var intervalVariable;

var transitions = [
	/*0*/[{nextState: 0, replacement: 'D', direction: true},{nextState: 0, replacement: '1', direction: true},{nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 0, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 1, replacement: '@', direction: false}],
	/*1*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 1, replacement: '1', direction: false}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 2, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*2*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 3, replacement: 'y', direction: false}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, direction: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*3*/[{nextState: 6, replacement: 'D', direction: true}, {nextState: 4, replacement: 'x', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 3, replacement: 'x', direction: false}, {nextState: 4, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 3, replacement: '#', direction: false}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*4*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 4, replacement: '1', direction: true}, {nextState: 4,replacement: '0',direction: true}, {nextState: 4,replacement: 'x',direction: true}, {nextState: 4,replacement: 'y',direction: true}, {nextState: 24,replacement: 'z',direction: true}, {nextState: 4,replacement: '#',direction: true}, {nextState: 4,replacement: '@',direction: true}, {nextState: 5,replacement: '0', direction: false}],
	/*5*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 5, replacement: '1', direction: false}, {nextState: 5, replacement: '0', direction: false}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 5, replacement: 'y', direction: false}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 3, replacement: '#', direction: false}, {nextState: 5, replacement: '@', direction: false}, {nextState: 24, replacement: 'B', direction: true},],
	/*6*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 24, replacement: '1', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 6, replacement: '1', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 7, replacement: '#', direction: false}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*7*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 8, replacement: 'x', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*8*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 9, replacement: 'y', direction: false}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 8, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 8, replacement: '#', direction: true}, {nextState: 17, replacement: '@', direction: false}, {nextState: 24, replacement: 'B', direction: true}],
	/*9*/[{nextState: 16, replacement: 'D', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 9, replacement: 'x', direction: false}, {nextState: 9, replacement: 'y', direction: false}, {nextState: 9, replacement: 'z', direction: false}, {nextState: 9, replacement: '#', direction: false}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*10*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true},{nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 11, replacement: 'B', direction: false}],
	/*11*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 11, replacement: '1', direction: false}, {nextState: 12, replacement: 'z', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*12*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 12, replacement: '1', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 12, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 13, replacement: '1', direction: false}],
	/*13*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: false}, {nextState: 12, replacement: 'z', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: false}, {nextState: 24, replacement: '#', direction: true}, {nextState: 14, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*14*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 15, replacement: '1', direction: false}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 14, replacement: '0', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*15*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 15, replacement: '1', direction: false}, {nextState: 15, replacement: '0', direction: false}, {nextState: 9, replacement: 'x', direction: false}, {nextState: 15, replacement: 'y', direction: false}, {nextState: 15, replacement: 'z', direction: false}, {nextState: 15, replacement: '#', direction: false}, {nextState: 15, replacement: '@', direction: false}, {nextState: 24, replacement: 'B', direction: true}],
	/*16*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 16, replacement: '1', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 16, replacement: 'x', direction: true}, {nextState: 16, replacement: 'y', direction: true}, {nextState: 16, replacement: '1', direction: true}, {nextState: 16, replacement: '#', direction: true}, {nextState: 22, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*17*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 24, replacement: '1', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 17, replacement: '1', direction: false}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 18, replacement: '#', direction: false}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*18*/[{nextState: 19, replacement: 'D', direction: true}, {nextState: 18, replacement: '1', direction: false}, {nextState: 24, replacement: '0', direction: true}, {nextState: 18, replacement: '1', direction: false}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*19*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 19, replacement: '1', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 19, replacement: '#', direction: true}, {nextState: 20, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*20*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 24, replacement: '1', direction: true}, {nextState: 20, replacement: '1', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 21, replacement: 'B', direction: false}],
	/*21*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 24, replacement: '1', direction: true}, {nextState: 24, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 24, replacement: 'B', direction: true}],
	/*22*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 22, replacement: '0', direction: true}, {nextState: 22, replacement: '0', direction: true}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 24, replacement: 'y', direction: true}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 24, replacement: '@', direction: true}, {nextState: 23, replacement: 'B', direction: false}],
	/*23*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 23, replacement: '1', direction: false}, {nextState: 23, replacement: '0', direction: false},{nextState: 24, replacement: 'x', direction: true}, {nextState: 23, replacement: 'y', direction: false}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 8, replacement: '#', direction:  true}, {nextState: 23, replacement: '@', direction: false}, {nextState: 24, replacement: 'B', direction: true}],
	/*24*/[{nextState: 24, replacement: 'D', direction: true}, {nextState: 23, replacement: '1', direction: false}, {nextState: 23, replacement: '0', direction: false}, {nextState: 24, replacement: 'x', direction: true}, {nextState: 23, replacement: 'y', direction: false}, {nextState: 24, replacement: 'z', direction: true}, {nextState: 24, replacement: '#', direction: true}, {nextState: 23, replacement: '@', direction: false}, {nextState: 24, replacement: 'B', direction: false}]
];

var initialTransitions = [
	/*0*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 1, replacement: 'x', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 1, replacement: 'y', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 10, replacement: 'B', direction: false}],
	/*1*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 1, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 1, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 2, replacement: 'B', direction: false}],
	/*2*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 3, replacement: 'B', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 7, replacement: 'D', direction: true}, {nextState: 8, replacement: 'D', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 5, replacement: 'B', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 10, replacement: 'B', direction: false}],
	/*3*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 4, replacement: '1', direction: false}],
	/*4*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 2, replacement: 'B', direction: false}],
	/*5*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 6, replacement: '#', direction: false}],
	/*6*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 2, replacement: 'B', direction: false}],
	/*7*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 9, replacement: '1', direction: false}],
	/*8*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 9, replacement: '#', direction: false}],
	/*9*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 10, replacement: 'B', direction: false}],
	/*10*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 10, replacement: '1', direction: true}, {nextState: 10, replacement: '0', direction: true}, {nextState: 10, replacement: 'x', direction: true}, {nextState: 10, replacement: 'y', direction: true}, {nextState: 10, replacement: 'z', direction: true}, {nextState: 10, replacement: '#', direction: true}, {nextState: 10, replacement: '@', direction: true}, {nextState: 10, replacement: 'B', direction: false}]		
];

var transitions2 = [
	/*0*/[{nextState: 0, replacement: 'D', direction: true}, {nextState: 0, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 0, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 1, replacement: '@', direction: false}],
	/*1*/[{nextState: 2, replacement: 'D', direction: true}, {nextState: 1, replacement: '1', direction: false}, {nextState: 13, replacement: '0', direction: true}, {nextState: 1, replacement: 'x', direction: false}, {nextState: 1, replacement: 'y', direction: false}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 1, replacement: '#', direction: false}, {nextState: 13, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}],
	/*2*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 3, replacement: 'x', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 2, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 5, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}],
	/*3*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 3, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 4, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}],
	/*4*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 1, replacement: 'y', direction: false}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 4, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 11, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}],
	/*5*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 6, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 5, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 8, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}],
	/*6*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 6, replacement: '@', direction: true}, {nextState: 7, replacement: '<', direction: false}],
	/*7*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 7, replacement: '1', direction: false}, {nextState: 13, replacement: '0', direction: true}, {nextState: 7, replacement: '1', direction: false}, {nextState: 7, replacement: '1', direction: false}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 7, replacement: '#', direction: false}, {nextState: 7, replacement: '@', direction: false}, {nextState: 13, replacement: 'B', direction: true}],
	/*8*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 9, replacement: '=', direction: false}],
	/*9*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 9, replacement: '1', direction: false}, {nextState: 9, replacement: '1', direction: false}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 9, replacement: '#', direction: false}, {nextState: 9, replacement: '@', direction: false}, {nextState: 13, replacement: 'B', direction: true}],
	/*10*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}],
	/*11*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 12, replacement: '>', direction: false}],
	/*12*/[{nextState: 10, replacement: 'D', direction: true}, {nextState: 12, replacement: '1', direction: false}, {nextState: 13, replacement: '0', direction: true}, {nextState: 12, replacement: '1', direction: false}, {nextState: 12, replacement: '1', direction: false}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 12, replacement: '#', direction: false}, {nextState: 12, replacement: '@', direction: false}, {nextState: 13, replacement: 'B', direction: true}],
	/*13*/[{nextState: 13, replacement: 'D', direction: true}, {nextState: 13, replacement: '1', direction: true}, {nextState: 13, replacement: '0', direction: true}, {nextState: 13, replacement: 'x', direction: true}, {nextState: 13, replacement: 'y', direction: true}, {nextState: 13, replacement: 'z', direction: true}, {nextState: 13, replacement: '#', direction: true}, {nextState: 13, replacement: '@', direction: true}, {nextState: 13, replacement: 'B', direction: true}]
];

readingHeadIndex = 0;

initialize(0,0);

startButton.disabled = true;
stepButton.disabled = true;
pauseButton.disabled = true;
initializeButton.disabled = true;
resetButton.disabled = true;

xField.disabled = true;
yField.disabled = true;
speedField.disabled = true;

// button handlers

$(document).ready(function() {
	$("#initialize").click(function() {
		var xVal = document.getElementById("x-value").value;
		var yVal = document.getElementById("y-value").value;
		var speed = document.getElementById("speed").value;
		if(xVal !== "" && xVal > 0 
			&& yVal !== "" && yVal > 0
			&& speed !== "" && speed >= 100) {			
			tapeRunningSpeed = speed;
			resetMachine();
			initialize(xVal, yVal);

			document.getElementById("x-value").value = "";
			document.getElementById("y-value").value = "";						
			document.getElementById("speed").value = "";
			startButton.disabled = false;
			stepButton.disabled = false;
			pauseButton.disabled = false;
		} else {
			alert("Fields cannot be empty.");
		}		
	})
})

$(document).ready(function() {
	$("#start").click(function() {				
		runTapeUntilEnd();					
	});
});

$(document).ready(function() {
	$("#step").click(function() {
		singleStep();
	})
})

$(document).ready(function() {
	$("#pause").click(function() {
		clearInterval(intervalVariable);
	})
})

$(document).ready(function() {
	$("#reset").click(function() {
		clearInterval(intervalVariable);
		resetMachine();
	});
})

$(document).ready(function() {
	$("#power").click(function() {
		resetMachine();
		operationOption = 0;
		initialize(0,0);

		initializeButton.disabled = false;
		resetButton.disabled = false;
		xField.disabled = false;
		yField.disabled = false;
		speedField.disabled = false;
	})
})

$(document).ready(function() {
	$("#comparison").click(function() {
		resetMachine();
		operationOption = 1;
		initialize(0,0);

		initializeButton.disabled = false;
		resetButton.disabled = false;
		xField.disabled = false;
		yField.disabled = false;
		speedField.disabled = false;
	})
})

function initialize(x, y) {

	origX = x;
	origY = y;
	
	inputTape = [];	
	var t = x;

	while(t > 0) {
		inputTape.push('1')
		t--;
	}

	inputTape.push('#');

	t = y;

	while(t > 0) {
		inputTape.push('1');
		t--;
	}

	var v = 1000000;

	while(v > 0) {
		inputTape.push('B');
		v--;
	}
		
	var insertion = document.getElementsByClassName("inputTape");	


	insertion[0].innerHTML = "<div>\n<ul>";
	
	for(var i = 0; i < 1000; i++) {
		insertion[0].innerHTML += "<li>\n<textarea id=\"" + i + "\" readonly>" + inputTape[i] + "</textarea>\n</li>";	
	}

	insertion[0].innerHTML += "</ul>\n</div>"	

	getFocus(0);
	machineInitialized = true;
}

function resetMachine() {		
	inputTape = [];
	readingHeadIndex = 0;
	currentState = 0;
	symbolId = 0;

	startSymbolAttached = false;
	iterations = 0;		

	initialize(0, 0)

	document.getElementById("count").innerHTML = iterations;
	document.getElementById("currentState").innerHTML = "q" + 0;

	machineInitialized = false;
	startButton.disabled = true;
	stepButton.disabled = true;
	pauseButton.disabled = true;
}

function renderOnConsole(x, y) {	
	console.log(inputTape.slice(x, y).join(" "));			
}

function runTapeUntilEnd() {		
	intervalVariable = setInterval(singleStep, tapeRunningSpeed);		
}

function singleStep() {
	if(machineInitialized) {
		if(((currentState === 24 && operationOption === 0) || (currentState === 10 && operationOption === 1)) && startSymbolAttached) {
			clearInterval(intervalVariable);
		}

		var correction = document.getElementById(readingHeadIndex);

		var currentCell = (!startSymbolAttached) 
						? initialTransitions[currentState][getCurrentSymbolId()]
						: ((operationOption === 0) 
							? transitions[currentState][getCurrentSymbolId()]
							: transitions2[currentState][getCurrentSymbolId()]);

		inputTape[readingHeadIndex] = currentCell.replacement;

		correction.innerHTML = currentCell.replacement;

		readingHeadIndex = (currentCell.direction) 
										? readingHeadIndex + 1 
										: readingHeadIndex - 1;

		currentState = currentCell.nextState;

		if(!startSymbolAttached && currentState === 10) {
			startSymbolAttached = true;
			currentState = 0;
		}

		getFocus(readingHeadIndex);
		
		iterations++;
		document.getElementById("count").innerHTML = iterations;
		document.getElementById("currentState").innerHTML = "q" + currentState;
	}
}

function getCurrentSymbolId() {
	var symbol = inputTape[readingHeadIndex];

	if (symbol === 'D') {
		return 0;
	}
	else if (symbol === '1') {
		return 1;
	}
	else if (symbol === '0') {
		return 2;
	}
	else if (symbol === 'x') {
		return 3;
	}
	else if (symbol === 'y') {
		return 4;
	} 
	else if (symbol === 'z') {
		return 5;
	}
	else if (symbol === '#') {
		return 6;
	}
	else if (symbol === '@') {
		return 7;
	}
	else if (symbol === 'B') {
		return 8;
	}
}

function getFocus(id) {
	document.getElementById(id).focus();
}

