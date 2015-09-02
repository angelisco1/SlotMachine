var fruits = ['cherry', 'grapes', 'lemon', 'orange', 'diamond white', 'diamond gold', 'x2', 'x5', 'x7', 'bonus'];
var a1, a2, a3, a4, a5;
var a1s, a2s, a3s, a4s, a5s;
var pos;
var machineScreen = new Array(3);


function showScreen(){

	pos[0] = getNewPosition(pos[0]);
	pos[1] = getNewPosition(pos[1]);
	pos[2] = getNewPosition(pos[2]);
	pos[3] = getNewPosition(pos[3]);
	pos[4] = getNewPosition(pos[4]);

	console.log(a1[calculateNextPosition(pos[0])] + " | " + a2[calculateNextPosition(pos[1])] + " | " + a3[calculateNextPosition(pos[2])] + " | " + a4[calculateNextPosition(pos[3])] + " | " + a5[calculateNextPosition(pos[4])]);
	console.log(a1[pos[0]] + " | " + a2[pos[1]] + " | " + a3[pos[2]] + " | " + a4[pos[3]] + " | " + a5[pos[4]]);
	console.log(a1[calculatePreviousPosition(pos[0])] + " | " + a2[calculatePreviousPosition(pos[1])] + " | " + a3[calculatePreviousPosition(pos[2])] + " | " + a4[calculatePreviousPosition(pos[3])] + " | " + a5[calculatePreviousPosition(pos[4])]);

}

function initializeRolls(){
	var roll = [];
	var fruit = fruits[Math.floor(Math.random()*fruits.length)];
	for (var i = 0; i < fruits.length; i++) {
		while(roll.indexOf(fruit) != -1){
			fruit = fruits[Math.floor(Math.random()*fruits.length)];
		}

		roll.push(fruit);
	};
	console.log(roll);
	return roll;
}

function getNewPosition(pos){
	var num = Math.floor(Math.random()*fruits.length);
	var newPos = (pos + num) % fruits.length;
	return newPos;
}

function initializeGame(){

	pos = [0, 0, 0, 0, 0]

	a1 = initializeRolls();
	a2 = initializeRolls();
	a3 = initializeRolls();
	a4 = initializeRolls();
	a5 = initializeRolls();

}

function calculateNextPosition(pos){
	var next = pos+1;
	if(next>fruits.length-1){
		return 0;
	}
	return next;
}

function calculatePreviousPosition(pos){
	var prev = pos-1;
	if(prev<0){
		return fruits.length-1;
	}
	return prev;
}

function play(){

	showScreen();
	
}

$(document).on('click', '#btn-play', function(event){
	event.preventDefault();
	play();
});