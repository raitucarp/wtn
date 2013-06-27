function wordsToNumberException(message, name) {
	this.message = message;
	this.name = name;
}
var wordsToNumber = function(word){
	var tokenToNumber = function(string, rule){
		string = string
				 .replace('one', 1).replace('two', 2).replace('three', 3).replace('four', 4).replace('five', 5)
				 .replace('six', 6).replace('seven', 7).replace('eight', 8).replace('nine', 9)
				 .replace('ten', 10).replace('eleven', 11).replace('twelve', 12).replace('thirteen', 13)
				 .replace('fourteen', 14).replace('fifteen', 15).replace('sixteen', 16).replace('seveteen', 17)
				 .replace('eighteen', 18).replace('nineteen', 19)
				 .replace('twenty', 20).replace('thirty', 30).replace('forty', 40).replace('fifty', 50).replace('sixty', 60)
				 .replace('seventy', 70).replace('eighty', 80).replace('ninety', 90)
				 .replace('hundred', 100).replace('thousand', 1000).replace('million', 1000000).replace('billion', 1000000000);
		return string;
	}
	
	var tokenize = function(statements, value){
		var returns, ev = '', 
			incUnit 	= 0, 
			incPower 	= 0, 
			incHundred 	= 0, 
			incTenth 	= 0, 
			incSpecial  = 0;
		
		console.log('--');

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
		var power 	= new RegExp('('+['thousand', 'million', 'billion'].join('|')+')', 'g'),
			hundred = new RegExp('('+['hundred'].join('|')+')', 'g'),
			tenth  	= new RegExp('('+
						['twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'].join('|')+')', 'g'),
			unit    = new RegExp('('+
						['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|')+')', 'g');
			special = new RegExp('('+
						['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
						 'sixteen', 'seveteen', 'eighteen', 'nineteen'].join('|')+')', 'g');
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