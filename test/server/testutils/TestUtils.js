module.exports = {

	buildString: function(numChars, value) {
		var tempArray = [];
        for (var i=0; i<numChars; i++) {
            tempArray.push(value);
        };
        return tempArray.join("");
	}

};