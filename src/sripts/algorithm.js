
  var matrix = new Matrix();

  $(function () {
     $("#calculate_btn").click(function () {
      calculate();
    });
    $('.copy_btn').click(function() {
      copyToClipboard( $(".matrix_result").text() );
    });
  });
  
  function calculate() {
    var date =  new Date($("#input_date").val());	
    matrix.init(date);
  
    $(".character").html(matrix.array[0]);
    $(".energy").html(matrix.array[1]);
    $(".interest").html(matrix.array[2]);
    $(".health").html(matrix.array[3]);
    $(".logic").html(matrix.array[4]);
    $(".work").html(matrix.array[5]);
    $(".luck").html(matrix.array[6]);
    $(".debt").html(matrix.array[7]);
    $(".memory").html(matrix.array[8]);
  
    $(".fate").text(matrix.fate);
    $(".temper").text(matrix.temper);
    $(".target").text(matrix.target);
    $(".family").text(matrix.family);
    $(".habbits").text(matrix.habbits);
    $(".mode_of_life").text(matrix.mode_of_life);
  
    $(".matrix_result").text(matrix.getString());
  }

  function copyToClipboard(str) {
    var area = document.createElement('textarea');
  
    document.body.appendChild(area);
      area.value = str;
      area.select();
      document.execCommand("copy");
    document.body.removeChild(area);
  }


function Matrix() {
	
	this.day = 0;
	this.month = 0;
	this.year = 0;
	
	this.normalizedDay = 0;
	this.normalizedMonth = 0;
	this.normalizedYear = 0;
	
	this.num1 = 0;
	this.num2 = 0;
	this.num3 = 0;
	this.num4 = 0;
	
	this.fate = '';
	this.temper = '';
	this.target = '';
	this.family = '';
	this.habbits = '';
	this.mode_of_life = '';
	
	this.array = [];
	this.empty = 'Пусто';
	
	this.init = function(date) {
		this.day = date.getDate();
		this.month = date.getMonth()+1;
		this.year = date.getFullYear();
		
		this.normalizedDay = this.normalize(this.day);
		this.normalizedMonth = this.normalize(this.month);
		this.normalizedYear = this.normalize(this.year);
		
		var sumOfDayAndMonth = this.getSum(this.normalizedDay + this.normalizedMonth);
		var sumOfYear = this.getSum(this.normalizedYear);
		
		this.num1 = sumOfDayAndMonth + sumOfYear;
		this.num2 = this.getSum('' + this.num1);
		this.num3 = this.num1 - parseInt(('' + this.day).charAt(0), 10) * 2;
		this.num4 = this.getSum('' + this.num3);
		
		this.array = [];
		
		var line1 = this.normalizedDay + this.normalizedMonth + this.normalizedYear;
		var line2 = this.normalize(this.num1) + this.normalize(this.num2) +
					this.normalize(this.num3) + this.normalize(this.num4);
					
		var str = line1 + line2;		
		this.array.push(this.getMatches(str, 1));
		this.array.push(this.getMatches(str, 2));
		this.array.push(this.getMatches(str, 3));
		this.array.push(this.getMatches(str, 4));
		this.array.push(this.getMatches(str, 5));
		this.array.push(this.getMatches(str, 6));
		this.array.push(this.getMatches(str, 7));
		this.array.push(this.getMatches(str, 8));
		this.array.push(this.getMatches(str, 9));
		
		this.temper = this.getNumbersCount(2, 4, 6);
		this.target = this.getNumbersCount(0, 3, 6);
		this.family = this.getNumbersCount(1, 4, 7);
		this.habbits = this.getNumbersCount(2, 5, 8);
		this.mode_of_life = this.getNumbersCount(3, 4, 5);
		
		var fate = 0;
		
		for(fate = this.getSum('' + this.num1); fate > 9 && fate != 11; fate = this.getSum('' + fate));
			
		this.fate = '' + fate;
	}
	
	this.normalize = function(digit) {
		if (digit >= 0 && digit <= 9) {
			return '0' + digit
		}
		
		return '' + digit
	}
	
	this.getNumbersCount = function(i1, i2, i3) {

		return '' + (this.array[i1] + this.array[i2] + this.array[i3]).length;
	}

	this.changeEmptyString = function(value)
	{
		return (this.array[value] === this.empty) ? '': this.array[value];
	}
	
	this.getSum = function(str) {
		var sum = 0;
		
		str.split('').forEach(function(item) {
			sum += parseInt(item, 10);
		});
		
		return sum;
	}
	
	this.getMatches = function(str, digit) {
		let res = '';
		
		str.split('').forEach(function(item) {
			var intItem = parseInt(item, 10);
			if (intItem == digit) {
				res += item;
			}
		});

		return res;
	}
	
	this.getNormalizedDate = function() {
		return this.normalizedDay + '/' + this.normalizedMonth + '/' + this.normalizedYear;
	}
	
	this.getMainNumbers = function() {
		return this.normalize(this.num1) + '.' + this.normalize(this.num2) + '.' +
				this.normalize(this.num3) + '.' + this.normalize(this.num4);
	}
	
	this.getString = function() {
		var str = this.getNormalizedDate() + '; ';
		
		this.array.forEach(function(item, i, arr) {
			str += item.length > 0 ? item : '-';
			if (i < arr.length -1) {
				str += ' / ';
			}
		});
		
		str += '; ЧС:' + this.fate;
		str += ' Т:' + this.temper;
		str += ' Ц:' + this.target;
		str += ' С:' + this.family;
		str += ' П:' + this.habbits;
		str += ' Б:' + this.mode_of_life;
		
		return str;
	}
}