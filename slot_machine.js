var fruits = [{name: 'cherry', image: 'images/cherry.png'}, {name: 'grapes', image: 'images/grapes.png'},
				{name: 'lemon', image: 'images/lemon.png'}, {name: 'orange', image: 'images/orange.png'},
				{name: 'diamond white', image: 'images/diamond_white.png'}, 
				{name: 'diamond gold', image: 'images/diamond_gold.png'},
				{name: 'x2', image: 'images/number_2.png'}, {name: 'x5', image: 'images/number_5.png'}, 
				{name: 'x7', image: 'images/number_7.png'}, {name: 'bonus', image: 'images/bonus.png'}];
var a1, a2, a3, a4, a5;
var a1s, a2s, a3s, a4s, a5s;
var pos;

var dx = 10;
var dy1 = 10;
var dy2 = 120;
var dy3 = 230;
var size = 100;

var line = 1;
var myCoins = 1000;
var machineScreen = new Array(3);
var info = 'Apuestas:  <ul><li>Segunda linea: 5€</li><li>Primera linea: 10€</li><li>Tercera linea: 15€</li><li>V: 20€</li><li>V invertida: 25€</li></ul>' +
			'Premios: <ul><li>Primera y tercera lineas:<ul><li>3 frutas seguidas: 20€</li><li>4 frutas seguidas: ant + 20€</li><li>5 frutas seguidas: ant + 40€</li></ul></li>' + 
			'<li>Segunda linea:<ul><li>3 frutas seguidas: 50€</li><li>4 frutas seguidas: ant + 50€</li><li>5 frutas seguidas: ant + 100€</li></ul></li>' + 
			'<li>V y V invertida:<ul><li>3 frutas seguidas: 30€</li><li>4 frutas seguidas: ant + 30€</li><li>5 frutas seguidas: ant + 60€</li></ul></li></ul>';

function initializeRolls(){
	var roll = [];
	var rollImg = [];
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

	showImagesOnScreen();


	$('#my-coins').text(myCoins);
	$('#current-bet').text('5');
	$('#current-line').text(line);

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

	console.log(a1[calculateNextPosition(pos[0])].name + " | " + a2[calculateNextPosition(pos[1])].name + " | " + a3[calculateNextPosition(pos[2])].name + " | " + a4[calculateNextPosition(pos[3])].name + " | " + a5[calculateNextPosition(pos[4])].name);
	console.log(a1[pos[0]].name + " | " + a2[pos[1]].name + " | " + a3[pos[2]].name + " | " + a4[pos[3]].name + " | " + a5[pos[4]].name);
	console.log(a1[calculatePreviousPosition(pos[0])].name + " | " + a2[calculatePreviousPosition(pos[1])].name + " | " + a3[calculatePreviousPosition(pos[2])].name + " | " + a4[calculatePreviousPosition(pos[3])].name + " | " + a5[calculatePreviousPosition(pos[4])].name);
	console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------');
	console.log(a1[calculateNextPosition(pos[0])].image + " | " + a2[calculateNextPosition(pos[1])].image + " | " + a3[calculateNextPosition(pos[2])].image + " | " + a4[calculateNextPosition(pos[3])].image + " | " + a5[calculateNextPosition(pos[4])].image);
	console.log(a1[pos[0]].image + " | " + a2[pos[1]].image + " | " + a3[pos[2]].image + " | " + a4[pos[3]].image + " | " + a5[pos[4]].image);
	console.log(a1[calculatePreviousPosition(pos[0])].image + " | " + a2[calculatePreviousPosition(pos[1])].image + " | " + a3[calculatePreviousPosition(pos[2])].image + " | " + a4[calculatePreviousPosition(pos[3])].image + " | " + a5[calculatePreviousPosition(pos[4])].image);
	console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------');

	showImagesOnScreen();

}

function showImagesOnScreen(){

	var canvas1 = document.getElementById('roll-1');
	var ctx1 = canvas1.getContext('2d');
	ctx1.lineWidth = 10;
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	ctx1.strokeRect(0, 0, canvas1.width, canvas1.height);
	var img1R1 = new Image();
	img1R1.onload = function(){
		ctx1.drawImage(img1R1, dx, dy1, size, size);
	}
	var img2R1 = new Image();
	img2R1.onload = function(){
		ctx1.drawImage(img2R1, dx, dy2, size, size);
	}	
	var img3R1 = new Image();
	img3R1.onload = function(){
		ctx1.drawImage(img3R1, dx, dy3, size, size);
	}
	img1R1.src = a1[calculateNextPosition(pos[0])].image;
	img2R1.src = a1[pos[0]].image;
	img3R1.src = a1[calculatePreviousPosition(pos[0])].image;

	var canvas2 = document.getElementById('roll-2');
	var ctx2 = canvas2.getContext('2d');
	ctx2.lineWidth = 10;
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
	ctx2.strokeRect(0, 0, canvas2.width, canvas2.height);
	var img1R2 = new Image();
	img1R2.onload = function(){
		ctx2.drawImage(img1R2, dx, dy1, size, size);
	}
	var img2R2 = new Image();
	img2R2.onload = function(){
		ctx2.drawImage(img2R2, dx, dy2, size, size);
	}	
	var img3R2 = new Image();
	img3R2.onload = function(){
		ctx2.drawImage(img3R2, dx, dy3, size, size);
	}
	img1R2.src = a2[calculateNextPosition(pos[1])].image;
	img2R2.src = a2[pos[1]].image;
	img3R2.src = a2[calculatePreviousPosition(pos[1])].image;

	var canvas3 = document.getElementById('roll-3');
	var ctx3 = canvas3.getContext('2d');
	ctx3.lineWidth = 10;
	ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
	ctx3.strokeRect(0, 0, canvas3.width, canvas3.height);
	var img1R3 = new Image();
	img1R3.onload = function(){
		ctx3.drawImage(img1R3, dx, dy1, size, size);
	}
	var img2R3 = new Image();
	img2R3.onload = function(){
		ctx3.drawImage(img2R3, dx, dy2, size, size);
	}	
	var img3R3 = new Image();
	img3R3.onload = function(){
		ctx3.drawImage(img3R3, dx, dy3, size, size);
	}
	img1R3.src = a3[calculateNextPosition(pos[2])].image;
	img2R3.src = a3[pos[2]].image;
	img3R3.src = a3[calculatePreviousPosition(pos[2])].image;

	var canvas4 = document.getElementById('roll-4');
	var ctx4 = canvas4.getContext('2d');
	ctx4.lineWidth = 10;
	ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
	ctx4.strokeRect(0, 0, canvas4.width, canvas4.height);
	var img1R4 = new Image();
	img1R4.onload = function(){
		ctx4.drawImage(img1R4, dx, dy1, size, size);
	}
	var img2R4 = new Image();
	img2R4.onload = function(){
		ctx4.drawImage(img2R4, dx, dy2, size, size);
	}	
	var img3R4 = new Image();
	img3R4.onload = function(){
		ctx4.drawImage(img3R4, dx, dy3, size, size);
	}
	img1R4.src = a4[calculateNextPosition(pos[3])].image;
	img2R4.src = a4[pos[3]].image;
	img3R4.src = a4[calculatePreviousPosition(pos[3])].image;

	var canvas5 = document.getElementById('roll-5');
	var ctx5 = canvas5.getContext('2d');
	ctx5.lineWidth = 10;
	ctx5.clearRect(0, 0, canvas5.width, canvas5.height);
	ctx5.strokeRect(0, 0, canvas5.width, canvas5.height);
	var img1R5 = new Image();
	img1R5.onload = function(){
		ctx5.drawImage(img1R5, dx, dy1, size, size);
	}
	var img2R5 = new Image();
	img2R5.onload = function(){
		ctx5.drawImage(img2R5, dx, dy2, size, size);
	}	
	var img3R5 = new Image();
	img3R5.onload = function(){
		ctx5.drawImage(img3R5, dx, dy3, size, size);
	}
	img1R5.src = a5[calculateNextPosition(pos[4])].image;
	img2R5.src = a5[pos[4]].image;
	img3R5.src = a5[calculatePreviousPosition(pos[4])].image;
}

function calculateInLine(){
	var points = 0;
	
	points += pointsInMiddleLine();
	if(line >= 2){points += pointsInFirstLine();}
	if(line >= 3){points += pointsInLastLine();}
	
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
	
	if(line >= 4){points += pointsInV();}
	if(line >= 5){points += pointsInReverseV();}
	
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
		sound = new Howl({
			urls: ['sounds/prize.mp3'],
			pos: 3000
		}).play();
		showPanelPrize(coins);
	}
}

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

function showPanelPrize(coins){
	$('#info-prize').text("Has ganado " + coins + "€");
	$('.prize-panel').modal('show');
}

$(document).on('click', '#btn-play', function(event){
	event.preventDefault();
	if(myCoins>0){
		play();
	}else{
		myCoins = prompt('Te has quedado sin monedas, introduce mas...');
		changeMyCoins();
	}
});

$(document).on('click', '#btn-bet-less', function(event){
	event.preventDefault();
	var bet = parseInt($('#current-bet').text());
	if(bet>5){
		bet -= 5;
		line--;
		$('#current-bet').text(bet);
		$('#current-line').text(line);
	}
});

$(document).on('click', '#btn-bet-more', function(event){
	event.preventDefault();
	var bet = parseInt($('#current-bet').text());
	if(bet<25){
		bet += 5;
		line++;
		$('#current-bet').text(bet);
		$('#current-line').text(line);
	}
});

$(document).on('click', '#btn-info', function(event){
	event.preventDefault();
	$('#info-panel').html(info);
});