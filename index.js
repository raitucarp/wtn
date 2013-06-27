function wordsToNumberException(message, name) {
	this.message = message;
	this.name = name;
}
var wordsToNumber = function(word){
	word = word.replace(/([\W]+)/g, ' ').replace(/\b(and)\b/g, ' ').replace(/\s{2,}/, ' ');
	
	var tokenToNumber = function(string, rule){
		string = string
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
		return string;
	}
	
	var tokenize = function(statements, value){
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
	};
	
	var getOrder = function(string){
		var r;
		switch(true){
			case !!string.match(/^unit$/):
			case !!string.match(/^special$/):
			case !!string.match(/^tenth$/):
				r = string.replace(/(.*s)/g, "$1");
			break;
			case !!string.match(/^tenth unit$/):
				r = 'tenth + unit';
			break;
			case !!string.match(/^unit hundred$/):
				r = '(unit * hundred)';
			break;
			case !!string.match(/^unit hundred special$/):
				r = '(unit * hundred) + special';
			break;
			case !!string.match(/^unit hundred tenth$/):
				r = '(unit * hundred) + tenth';
			break;
			case !!string.match(/^unit hundred unit$/):
				r = '(unit * hundred) + unit';
			break;
			case !!string.match(/^unit hundred tenth unit$/):
				r = '(unit * hundred) + tenth + unit';
			break;
			default:
				throw new wordsToNumberException("InvalidToken", "Switch Case OrderException");
			break;
		}
		
		return r;
	}
	
	var convert = function (string) {
		var power 	= new RegExp('\\b('+['thousand', 'million', 'billion'].join('|')+')\\b', 'g'),
			hundred = new RegExp('\\b('+['hundred'].join('|')+')\\b', 'g'),
			tenth  	= new RegExp('\\b('+['twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'].join('|')+')\\b', 'g'),
			unit    = new RegExp('\\b('+['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|')+')\\b', 'g');
			special = new RegExp('\\b('+['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
						 'sixteen', 'seveteen', 'eighteen', 'nineteen'].join('|')+')\\b', 'g'); 
		var value = new Array();		 
			value['power'] 	=  (string.match(power) == null) ? [''] : string.match(power);
			value['hundred']=  (string.match(hundred) == null) ? [''] : string.match(hundred);
			value['tenth']	=  (string.match(tenth) == null) ? [''] : string.match(tenth);
			value['unit']   =  (string.match(unit) == null) ? [''] : string.match(unit);
			value['special']=  (string.match(special) == null) ? [''] : string.match(special);
			
		
		string = string
				 .replace(power, 'power')
				 .replace(hundred, 'hundred')
				 .replace(unit, 'unit')
				 .replace(special, 'special')
				 .replace(tenth, 'tenth')
				 .split('power');
		
		return tokenize(string, value);
	};
	return convert(word);
}

module.exports = wordsToNumber;