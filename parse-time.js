//Write a library from scratch that can parse date strings and 
// convert them to a valid ISO 8601 date/time format. 
// Every value in this list should be supported.

//Sorry, not the most elegant code and I didn't really have time to refactor.


var parseDate = function(string){
	if(/\d+-\d+-\d+/.test(string)) return string;
	var year = getYear(string);
	string = replaceIt(string, year);
	var hour = getHour(string);
	string = replaceIt(string, hour.toBeRemoved);
	var month = getMonth(string);
	string = replaceIt(string, month.toBeRemoved);
	var ms = getMs(string);
	string = replaceIt(string, ms.toBeRemoved);
	var day = getDay(string);
	
	string = year + 
			(year ? '-' : '') + 
			(day.toString().length === 1 ? '0' + day : day)  + 
			(day? '-'  :'') + 
			(month.number.toString().length === 1 ? '0' + month.number : month.number) +
			(hour.number ? 'T' : '') +
			hour.number + ms.number;
	
	return string;
};

function getYear(string){
	year = string.match(/\d{4}/g);
	if(year){
		return year[0];
	} else {
		return "";
	}
	
}

function getHour (string){
	var arr = string.match(/(\d+:){1,}\d+/);
	if(arr){
		if(string.indexOf('PM') >= 0){
			var newArray = arr[0].split(':');
			newArray[0] = (Number(newArray[0]) + 12).toString();
			return {
				number: newArray.join(':'),
				toBeRemoved: arr[0]
			}
		}
		return {
			number: arr[0], 
			toBeRemoved: arr[0]
			
		};
	} else { 
		return { 
			number :"", 
			toBeRemoved: "" 
		
		} 
		
	};

}

function getMonth(string){
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var arr = string.match(/[a-zA-Z]{3,}/g);
	var month;
	if(arr){
		month;
		for(var i in arr){
			var regExp = new RegExp( arr[i], 'i');
			for(var l in months){
				var matchedMonth = months[l].match(regExp);
				if(matchedMonth){
					month = {
						number: ++l,
						toBeRemoved: arr[i]
					};
					break;
				}
			}
			if(month){
				break;
			}
		}
	return month;
	} else {
		var monthByNumber = string.match(/\d+/g);
		if(!monthByNumber){ return { 
			number:"", 
			toBeRemoved: "" 
			}
		}
		
		if(monthByNumber[0].length > 2){
			month = {
				number: monthByNumber[0].slice(0, 2),
				toBeRemoved: monthByNumber[0].slice(0, 2)
			};
		} else {
			if(string.indexOf('PM') >= 0){
				month = {
					number: monthByNumber[0], 
					toBeRemoved: monthByNumber[0]
				};
			} else {
				//console.log('monthByNumber ', monthByNumber)
				month = string.indexOf('/') >= 0 ? monthByNumber[1] : monthByNumber[0];
				month = {
					number: month, 
					toBeRemoved: month
				};
			}
			
		}
		return month;
	}
	
}

function getMs(string) {
	var arr = string.match(/-\d+:?\d+/);
	var ms; 
	if(arr){
		ms = arr[0];
		if(ms.indexOf(':' < 0)){
			ms = ms.slice(0, 3) + ':' + ms.slice(3, ms.length);
		}
		return { number: ms, toBeRemoved: arr[0]};
	} else {
		return {number :"", toBeRemoved: ''};
	}
}

function getDay(string){
	var arr = string.match(/\d+/);
	if(arr){
		return arr[0];
	} else {
		return "";
	}
	
}

function replaceIt(string, it){
	return string.replace(it, '');
}

module.exports = parseDate;