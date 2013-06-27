function wordsToNumberException(message, name) {
	this.message = message;
	this.name = name;
}

function tokenToNumber(str, rule) {
	return str
			.replace(/\b(one)\b/, 1)
			.replace(/\b(two)\b/, 2)
			.replace(/\b(three)\b/, 3)
			.replace(/\b(four)\b/, 4)
			.replace(/\b(five)\b/, 5)
			.replace(/\b(six)\b/, 6)
			.replace(/\b(seven)\b/, 7)
			.replace(/\b(eight)\b/, 8)
			.replace(/\b(nine)\b/, 9)
			.replace(/\b(ten)\b/, 10)
			.replace(/\b(eleven)\b/, 11)
			.replace(/\b(twelve)\b/, 12)
			.replace(/\b(thirteen)\b/, 13)
			.replace(/\b(fourteen)\b/, 14)
			.replace(/\b(fifteen)\b/, 15)
			.replace(/\b(sixteen)\b/, 16)
			.replace(/\b(seveteen)\b/, 17)
			.replace(/\b(eighteen)\b/, 18)
			.replace(/\b(nineteen)\b/, 19)
			.replace(/\b(twenty)\b/, 20)
			.replace(/\b(thirty)\b/, 30)
			.replace(/\b(forty)\b/, 40)
			.replace(/\b(fifty)\b/, 50)
			.replace(/\b(sixty)\b/, 60)
			.replace(/\b(seventy)\b/, 70)
			.replace(/\b(eighty)\b/, 80)
			.replace(/\b(ninety)\b/, 90)
			.replace(/\b(hundred)\b/, 100)
			.replace(/\b(thousand)\b/, 1000)
			.replace(/\b(million)\b/, 1000000)
			.replace(/\b(billion)\b/, 1000000000);
}

function tokenize(statements, value){
	var returns, ev = '',
		incUnit 	= 0,
		incPower 	= 0,
		incHundred 	= 0,
		incTenth 	= 0,
		incSpecial  = 0;

	for(var i in statements){
		var statement = statements[i].replace(/^\s+|\s+$/g, '');
		if(statement == '') throw "Error token";
		var order = getOrder(statement);

		if(order.match(/hundred/g)){
			order = order.replace('hundred', value['hundred'][incHundred]);
			incHundred++;
		}

		if(order.match(/unit/g)){
			var orderMatchUnitLength = order.match(/unit/g).length;
			for(var x =0; x < orderMatchUnitLength; x++){
				order = order.replace('unit', value['unit'][incUnit]);
				incUnit++;
			}
		}

		if(order.match(/special/g)){
			order = order.replace('special', value['special'][incSpecial])
			incSpecial++;
		}

		if(order.match(/tenth/g)){
			order = order.replace('tenth', value['tenth'][incTenth]);
			incTenth++;
		}

		ev += (i == statements.length-1) ? order : '('+order + ' * ' + value['power'][incPower]+') + ';
		incPower++;
	}

	returns = eval(tokenToNumber(ev));
	return returns;
}

function getOrder(str, i){
	var r;
	switch(true){
		case !!str.match(/^unit$/):i
		case !!str.match(/^special$/):i
		case !!str.match(/^tenth$/):i
			r = str.replace(/(.*s)/g, "$1");i
		break;
		case !!str.match(/^tenth unit$/):i
			r = 'tenth + unit';
		break;
		case !!str.match(/^unit hundred$/):i
			r = '(unit * hundred)';
		break;
		case !!str.match(/^unit hundred special$/):i
			r = '(unit * hundred) + special';
		break;
		case !!str.match(/^unit hundred tenth$/):i
			r = '(unit * hundred) + tenth';
		break;
		case !!str.match(/^unit hundred unit$/):i
			r = '(unit * hundred) + unit';
		break;
		case !!str.match(/^unit hundred tenth unit$/):i
			r = '(unit * hundred) + tenth + unit';
		break;
		default:
			throw new wordsToNumberException("InvalidToken", "Switch Case OrderException");
		break;
	}

	return r;
}

function convert(word){
	word = word.replace(/([\W]+)/g, ' ').replace(/\b(and)\b/g, ' ').replace(/\s{2,}/, ' ');

	var power 	= new RegExp('\\b('+['thousand', 'million', 'billion'].join('|')+')\\b', 'g'),
			hundred = new RegExp('\\b('+['hundred'].join('|')+')\\b', 'g'),
			tenth  	= new RegExp('\\b('+['twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'].join('|')+')\\b', 'g'),
			unit    = new RegExp('\\b('+['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|')+')\\b', 'g');
			special = new RegExp('\\b('+['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
						 'sixteen', 'seveteen', 'eighteen', 'nineteen'].join('|')+')\\b', 'g');
	var value = new Array();
		value['power'] 	=  (word.match(power) == null) ? [''] : word.match(power);
		value['hundred']=  (word.match(hundred) == null) ? [''] : word.match(hundred);
		value['tenth']	=  (word.match(tenth) == null) ? [''] : word.match(tenth);
		value['unit']   =  (word.match(unit) == null) ? [''] : word.match(unit);
		value['special']=  (word.match(special) == null) ? [''] : word.match(special);


	word = word
			.replace(power, 'power')
			.replace(hundred, 'hundred')
			.replace(unit, 'unit')
			.replace(special, 'special')
			.replace(tenth, 'tenth')
			.split('power');

	return tokenize(word, value);
}

exports.convert = convert;
exports.tokenToNumber = tokenToNumber;
exports.tokenize = tokenize;
exports.getOrder = getOrder;