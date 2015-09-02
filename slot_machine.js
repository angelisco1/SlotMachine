var fruits = ['cherry', 'grapes', 'lemon', 'orange', 'diamond white', 'diamond gold', 'x2', 'x5', 'x7', 'bonus'];


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

function play(){

	var a1 = initializeRolls();
	var a2 = initializeRolls();
	var a3 = initializeRolls();
	var a4 = initializeRolls();
	var a5 = initializeRolls();

}

$(document).on('click', '#btn-play', function(event){
	event.preventDefault();
	play();
});