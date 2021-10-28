
$(function () {
	$(".calculate_btn").click(function () {
		var date = new Date($("#input_date").val());

		if (!isValidDate(date))
			return;

		calculate(date);
	});

	$('.copy_btn').click(function () {
		copyToClipboard($(".matrix_result").text());
	});
});

function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}

function calculate(date) {
	
	var matrix = new PercovaMatrix();

	matrix.calculateMatrix(date);

	$(".character").html(matrix.character);
	$(".energy").html(matrix.energy);
	$(".interest").html(matrix.interest);
	$(".health").html(matrix.health);
	$(".logic").html(matrix.logic);
	$(".work").html(matrix.work);
	$(".luck").html(matrix.luck);
	$(".debt").html(matrix.debt);
	$(".memory").html(matrix.memory);

	$(".fate").text(matrix.fate);
	$(".temper").text(matrix.temper);
	$(".target").text(matrix.target);
	$(".family").text(matrix.family);
	$(".habbits").text(matrix.habbits);
	$(".mode_of_life").text(matrix.mode_of_life);

	$(".matrix_result").text(matrix.getResult());
}

function copyToClipboard(str) {
	var area = document.createElement('textarea');

	document.body.appendChild(area);
	area.value = str;
	area.select();
	document.execCommand("copy");
	document.body.removeChild(area);
}


function PercovaMatrix() {

	date = new Date();
	this.character = "Пусто";
	this.energy = "Пусто";
	this.interest = "Пусто";
	this.health = "Пусто";
	this.logic = "Пусто";
	this.work = "Пусто";
	this.luck = "Пусто";
	this.debt = "Пусто";
	this.memory = "Пусто";
	this.fate = "Пусто";
	this.temper = "Пусто";
	this.target = "Пусто";
	this.family = "Пусто";
	this.habbits = "Пусто";
	this.mode_of_life = "Пусто";

	var numberArray = [0,0,0,0,0,0,0,0,0,0];

	this.calculateMatrix = function (date) {
				
		this.date = date;
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		let additionalFirst = getAdditionalFirst(day, month, year);
		let additionalSecond = getAdditionalSecond(additionalFirst);
		let additionalThird = getAdditionalThird(additionalFirst, day);
		let additionalFourth = getAdditionalFourth(additionalThird);

		fillArray(additionalFirst);
		fillArray(additionalSecond);
		fillArray(additionalThird);
		fillArray(additionalFourth);

		this.character = numberArray[1] === 0 ? 'Пусто': fillMatrix('1', numberArray[1]);
		this.energy = numberArray[2] === 0 ? 'Пусто': fillMatrix('2', numberArray[2]);
		this.interest = numberArray[3] === 0 ? 'Пусто': fillMatrix('3', numberArray[3]);
		this.health = numberArray[4] === 0 ? 'Пусто': fillMatrix('4', numberArray[4]);
		this.logic = numberArray[5] === 0 ? 'Пусто': fillMatrix('5', numberArray[5]);
		this.work = numberArray[6] === 0 ? 'Пусто': fillMatrix('6', numberArray[6]);
		this.luck = numberArray[7] === 0 ? 'Пусто': fillMatrix('7', numberArray[7]);
		this.debt = numberArray[8] === 0 ? 'Пусто': fillMatrix('8', numberArray[8]);
		this.memory = numberArray[9] === 0 ? 'Пусто': fillMatrix('9', numberArray[9]);
		let temp = getFate(additionalFirst);
		this.fate = temp === 0 ? 'Пусто' : temp;		
		temp = getModOfLife();
		this.mode_of_life = temp === 0 ? 'Пусто' : temp;
		temp = getTemper();
		this.temper = temp === 0 ? 'Пусто' : temp;
		temp = getTarget();
		this.target = temp === 0 ? 'Пусто' : temp;
		temp = getFamily();
		this.family = temp === 0 ? 'Пусто' : temp;
		temp = getHabbits();
		this.habbits = temp === 0 ? 'Пусто' : temp;
	}

	getModOfLife = function(){
		return numberArray[4] + numberArray[5] + numberArray[6];
	}

	getTemper = function(){
		return numberArray[3] + numberArray[5] + numberArray[7];
	}

	getTarget = function(){
		return numberArray[1] + numberArray[4] + numberArray[7];
	}

	getFamily = function(){
		return numberArray[2] + numberArray[5] + numberArray[8];
	}

	getHabbits = function(){
		return numberArray[3] + numberArray[6] + numberArray[9];
	}

	getFate = function (number) {
		let result = 0;

		while (number > 0) {
			let temp = number % 10;
			result += temp;
			number = (number - temp)/10;

			if (number === 0 && result > 9 && result !== 11) {
				number = result;
				result = 0;
			}
		}

		return result;
	}



	fillArray = function (number) {
		let result = 0;

		while (number > 0) {
			let temp = number % 10;			
			result += temp;
			number = (number - temp)/10;
			numberArray[temp]++;			
		}

		return result;
	}

	getAdditionalFirst = function (day, month, year) {
		let result = fillArray(day);
		result += fillArray(month);
		result += fillArray(year);

		return result;
	}

	getAdditionalSecond = function (number) {
		let result = 0;

		while (number > 0) {
			let temp = number % 10;
			result += number % 10;
			number = (number - temp)/10;
		}

		return result;
	}

	getAdditionalThird = function (number, day) {
		let firstNumber = 0;

		while(day > 0){
			firstNumber = day % 10;
			day = (day - firstNumber)/10;
		}			

		return number - (firstNumber * 2);
	}

	getAdditionalFourth = function (number) {
		let result = 0;

		while (number > 0) {
			let temp = number % 10;
			result += number % 10;
			number = (number - temp)/10;
		}

		return result;
	}

	fillMatrix = function (number, count) {
		let result = '';

		for (let i = 0; i < count; i++) {
			result += number;
		}

		return result;
	}

	this.getResult = function(){
		let result = '';
		let formatter = new Intl.DateTimeFormat("ru");
		result = formatter.format(this.date);
		result +=';'
		result += (this.character === 'Пусто'?'-':this.character)+ '/';
		result += (this.energy === 'Пусто'?'-':this.energy) + '/';
		result += (this.interest === 'Пусто'?'-':this.interest) + '/';
		result += (this.health === 'Пусто'?'-':this.health) + '/';
		result += (this.logic === 'Пусто'?'-':this.logic) + '/';
		result += (this.work === 'Пусто'?'-':this.work) + '/';
		result += (this.luck === 'Пусто'?'-':this.luck) + '/';
		result += (this.debt === 'Пусто'?'-':this.debt) + '/';
		result += (this.memory === 'Пусто'?'-':this.memory) + ';';

		result += 'ЧС:'+(this.fate === 'Пусто'?'-':this.fate) + ' ';
		result += 'Т:'+(this.temper === 'Пусто'?'-':this.temper) + ' ';
		result += 'Ц:'+(this.targer === 'Пусто'?'-':this.target) + ' ';
		result += 'С:'+(this.family === 'Пусто'?'-':this.family) + ' ';
		result += 'П:'+(this.habbits === 'Пусто'?'-':this.habbits) + ' ';
		result += 'Б:'+(this.mode_of_life === 'Пусто'?'-':this.mode_of_life) + ';';

		return result;
	}
}