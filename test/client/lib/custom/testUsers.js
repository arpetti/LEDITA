(function(exports){

	// For this to work, need to make sure that test database is seeded with sample users
	var users = [
		{
			username:   "sara@email.it",
			password:   "passw0rD",
		},
		{
			username:   "mario@email.it",
			password:   "passw0rD",
		}
	];

	exports.getUserName = getUserName(users[0]);
	exports.getUserPassword = getUserPassword(users[0]);

	exports.getMarioUserName = getUserName(users[1]);
	exports.getMarioUserPassword = getUserPassword(users[1]);
	
	exports.buildLongEmailAddress = buildLongEmailAddress();

	exports.buildLongLdName = buildLongString(51);
	exports.buildMaxLdName = buildLongString(50);

	function getUserName(user) {
		return user.username;
	};

	function getUserPassword(user) {
		return user.password;
	};

	function buildLongEmailAddress() {
		var tempArray = [];
        for (var i=0; i<150; i++) {
            tempArray.push('a');
        };
        var tempString = tempArray.join("");
        return tempString + "." + tempString + "@test.com";
	};

	function buildLongString(numChars) {
		var tempArray = [];
        for (var i=0; i<numChars; i++) {
            tempArray.push('a');
        };
        return tempArray.join("");
	};

})(typeof exports === 'undefined' ? this['testUsers'] = {} : exports);	