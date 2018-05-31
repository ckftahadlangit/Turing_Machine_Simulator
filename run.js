var inputTape = [];
var readingHeadIndex = 0;
var currentState = 0;
var symbolId = 0;

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

// console.log(transitions);
// console.log(initialTransitions);

var x = 3;

while(x > 0) {
	inputTape.push('1')
	x--;
}

inputTape.push('#');

x = 2;

while(x > 0) {
	inputTape.push('1');
	x--;
}

readingHeadIndex = 0;

function render(x, y) {	
	console.log(inputTape.slice(x, y).join(" "));			
}

x = 1000000;
while(x > 0) {
	inputTape.push('B');
	x--;
}

render(0, 30);

while(currentState != 10) {
	var currentCell = initialTransitions[currentState][getCurrentSymbolId()];
	
	inputTape[readingHeadIndex] = currentCell.replacement;

	readingHeadIndex = (currentCell.direction) 
									? readingHeadIndex + 1 
									: readingHeadIndex - 1;

	currentState = currentCell.nextState;

	render(0, 30);

	console.log("Tape index: ", readingHeadIndex);
	console.log("Current state: ", currentState);
	console.log("Current symbol: ", inputTape[readingHeadIndex]);
	console.log("Direction: ", currentCell.direction);

	console.log();
}

currentState = 0;

while(currentState != 24) {
	var currentCell = transitions[currentState][getCurrentSymbolId()];
	
	inputTape[readingHeadIndex] = currentCell.replacement;

	readingHeadIndex = (currentCell.direction) 
									? readingHeadIndex + 1 
									: readingHeadIndex - 1;

	currentState = currentCell.nextState;

	render(0, 30);

	console.log("Tape index: ", readingHeadIndex);
	console.log("Current state: ", currentState);
	console.log("Current symbol: ", inputTape[readingHeadIndex]);
	console.log("Direction: ", currentCell.direction);

	console.log();
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

// 	Cell transitions2[14][9] = {
// 		/*0*/{Cell(0, 'D', true), Cell(0, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(0, '#', true), Cell(13, '@', true), Cell(1, '@', false)},
// 		/*1*/{Cell(2, 'D', true), Cell(1, '1', true), Cell(13, '0', true), Cell(1, 'x', true), Cell(1, 'y', true), Cell(13, 'z', true), Cell(1, '#', false), Cell(13, '@', true), Cell(13, 'B', true)},
// 		/*2*/{Cell(13, 'D', true), Cell(3, 'x', true), Cell(13, '0', true), Cell(2, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(5, '#', true), Cell(13, '@', true), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(3, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(4, '#', true), Cell(13, '@', true), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(1, 'y', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(4, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(11, '@', true), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(6, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(5, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(8, '@', true), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(13, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(6, '@', true), Cell(7, '<', false)},
// 		/*0*/{Cell(10, 'D', true), Cell(7, '1', false), Cell(13, '0', true), Cell(7, '1', false), Cell(7, '1', false), Cell(13, 'z', true), Cell(7, '#', true), Cell(7, '@', true), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(13, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(13, '@', true), Cell(9, '=', false)},
// 		/*0*/{Cell(10, 'D', true), Cell(13, '1', true), Cell(13, '0', true), Cell(9, '1', false), Cell(9, '1', false), Cell(13, 'z', true), Cell(9, '#', false), Cell(9, '@', false), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(13, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(13, '@', true), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(13, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(13, '@', true), Cell(12, '>', false)},
// 		/*0*/{Cell(10, 'D', true), Cell(12, '1', false), Cell(13, '0', true), Cell(12, '1', false), Cell(12, '1', false), Cell(13, 'z', true), Cell(12, '#', false), Cell(12, '@', false), Cell(13, 'B', true)},
// 		/*0*/{Cell(13, 'D', true), Cell(13, '1', true), Cell(13, '0', true), Cell(13, 'x', true), Cell(13, 'y', true), Cell(13, 'z', true), Cell(13, '#', true), Cell(13, '@', true), Cell(13, 'B', true)}
// 	};