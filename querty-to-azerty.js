
var azertyToQwerty = function(string) {
	var querty = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+{}|:\"<>?QWERTYUIOPASDFGHJKLZXCVBNM¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æΩ≈ç√∫˜µ≤≥÷";
	var azerty = "<&é\"'(§è!çà)-azertyuiop^$`qsdfghjklmùwxcvbn,;:=>1234567890°_¨*£M%./+AZERTYUIOPQSDFGHJKLWXCVBN?ë“‘{¶«¡Çø}—æÂê®†Úºîœπô€@‡Ò∂ƒﬁÌÏÈ¬µÙ‹≈©◊ß~∞…÷≠";
	var newString = string;
	var counter = 0;
	for(var i = 0; i < string.length; i++){
		var index = querty.indexOf(string[i]);
		if(index >= 0 && newString[i] === string[i]){
			var charToBeReplaced = new RegExp(string[i], 'g');
			newString = newString.replace(charToBeReplaced, azerty[index]);
			
		}
	}
	return newString;
};

module.exports = azertyToQwerty;



