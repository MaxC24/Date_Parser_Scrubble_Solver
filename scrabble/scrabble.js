var fs = require('fs');

var dictionary = fs.readFileSync('./words.txt', 'utf-8').split('\n');

var hashTable = [];

for(var i in dictionary) {
	var value = getValue(dictionary[i]);
	hashTable[value] ? hashTable[value].push(dictionary[i]) : hashTable[value] = [dictionary[i]];
}

//find the value for each word in the dictionary:
function getValue(word) {
	var value = 0;
	if(word.match(/[zq]/gi)) value += word.match(/[zq]/gi).length * 10;
	if(word.match(/[jx]/gi)) value += word.match(/[jx]/gi).length * 8;
	if(word.match(/[k]/gi)) value += word.match(/[k]/gi).length * 5;
	if(word.match(/[hfwyv]/gi)) value += word.match(/[hfwyv]/gi).length * 4;
	if(word.match(/[cmbp]/gi)) value += word.match(/[cmbp]/gi).length * 3;
	if(word.match(/[dg]/gi)) value += word.match(/[dg]/gi).length * 2;
	if(word.match(/[eaotinrslu]/gi)) value += word.match(/[eaotinrslu]/gi).length * 1;
	return value;
}


function scrabble (letters) {
	var lettersRegExp = new RegExp( "[" + letters + "]" , 'gi');
	var bestWord; 
	for(var i = hashTable.length - 1 ; i >= 0; i--){
		for(var k in hashTable[i]){
			var current = hashTable[i][k];
			var match = current.match(lettersRegExp);
			if(match && match.length === current.length){
				bestWord = current;
				break;
			}
		}
		if(bestWord) break;
	}
	return bestWord || 'not found';
}

