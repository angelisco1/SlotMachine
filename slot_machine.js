var fruits = ['cherry', 'grapes', 'lemon', 'orange', 'diamond white', 'diamond gold', 'x2', 'x5', 'x7', 'bonus'];
var a1, a2, a3, a4, a5;
var a1s, a2s, a3s, a4s, a5s;
var pos;
var myCoins = 1000;
var machineScreen = new Array(3);
var info = "Apuestas: \n- Primera linea: 10€ \n- Segunda linea: 5€ \n- Tercera linea: 15€ \n- V: 20€ \n- Reverse V: 25€" +
			"Premios: \n- 3 frutas seguidas: ... \n- 4 frutas seguidas: ... \n- 5 frutas seguidas: ...";

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

	pos = [0, 0, 0, 0, 0];

	a1 = initializeRolls();
	a2 = initializeRolls();
	a3 = initializeRolls();
	a4 = initializeRolls();
	a5 = initializeRolls();

	$('#my-coins').text(myCoins);

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

function calculateInLine(){
	var points = 0;
	
	points += pointsInMiddleLine() + pointsInFirstLine() + pointsInLastLine();
	
	return points;
}

function pointsInMiddleLine(){
	var points = 0;
	fruit = a1[pos[0]];
	if(fruit == a2[pos[1]] && fruit == a3[pos[2]]){
		points = 50;
	}
	if(fruit == a4[pos[3]] && points == 50){
		points += 50;
	}
	if(fruit == a5[pos[4]] && points == 100){
		points += 100;
	}
	return points;
}

function pointsInFirstLine(){
	var points = 0;
	fruit = a1[calculateNextPosition(pos[0])];
	if(fruit == a2[calculateNextPosition(pos[1])] && fruit == a3[calculateNextPosition(pos[2])]){
		points = 20;
	}
	if(fruit == a4[calculateNextPosition(pos[3])] && points == 20){
		points += 20;
	}
	if(fruit == a5[calculateNextPosition(pos[4])] && points == 40){
		points += 40;
	}
	return points;
}

function pointsInLastLine(){
	var points = 0;
	fruit = a1[calculatePreviousPosition(pos[0])];
	if(fruit == a2[calculatePreviousPosition(pos[1])] && fruit == a3[calculatePreviousPosition(pos[2])]){
		points = 20;
	}
	if(fruit == a4[calculatePreviousPosition(pos[3])] && points == 20){
		points += 20;
	}
	if(fruit == a5[calculatePreviousPosition(pos[4])] && points == 40){
		points += 40;
	}
	return points;
}

function calculateInV(){
	var points = 0;
	
	points += pointsInV() + pointsInReverseV();
	
	return points;
}

function pointsInV(){
	var points = 0;
	fruit = a1[calculateNextPosition(pos[0])];
	if(fruit == a2[pos[1]] && fruit == a3[calculatePreviousPosition(pos[2])]){
		points += 30;
	}
	if(fruit == a4[pos[3]] && points == 30){
		points += 30;
	}
	if(fruit == a5[calculateNextPosition(pos[4])] && points == 60){
		points += 60;
	}
	return points;
}

function pointsInReverseV(){
	var points = 0;
	fruit = a1[calculatePreviousPosition(pos[0])];
	if(fruit == a2[pos[1]] && fruit == a3[calculateNextPosition(pos[2])]){
		points += 30;
	}
	if(fruit == a4[pos[3]] && points == 30){
		points += 30;
	}
	if(fruit == a5[calculatePreviousPosition(pos[4])] && points == 60){
		points += 60;
	}
	return points;
}

function calculatePoints(){
	return calculateInLine() + calculateInV();
}

function play(){
	showScreen();
	changeEarnedCoins(0);
	calculateMyCoins();

	var coins = calculatePoints();
	if(coins > 0){
		changeEarnedCoins(coins);
		myCoins += coins;
		changeMyCoins();
	}
}

$(document).on('click', '#btn-play', function(event){
	event.preventDefault();
	play();
});

$(document).on('click', '#btn-bet-less', function(event){
	event.preventDefault();
	var bet = parseInt($('#current-bet').text());
	if(bet>5){
		bet -= 5;
	}
	$('#current-bet').text(bet);
});

$(document).on('click', '#btn-bet-more', function(event){
	event.preventDefault();
	var bet = parseInt($('#current-bet').text());
	if(bet<25){
		bet += 5;
	}
	$('#current-bet').text(bet);
});

$(document).on('click', '#btn-info', function(event){
	event.preventDefault();
	
});

function calculateMyCoins(){
	myCoins = myCoins - parseInt($('#current-bet').text());
	changeMyCoins();
}

function changeMyCoins(){
	$('#my-coins').text(myCoins);
}

function changeEarnedCoins(coins){
	$('#prize').text(coins);
}