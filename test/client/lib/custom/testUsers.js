(function(exports){

	// For this to work, need to make sure that test database is seeded with sample users
	var users = [
		{
			username:   "sara@email.it",
			password:   "passw0rD",
		}
	];

	exports.getUserName = getUserName(users[0]);
	exports.getUserPassword = getUserPassword(users[0]);
	exports.buildLongEmailAddress = buildLongEmailAddress();

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

})(typeof exports === 'undefined' ? this['testUsers'] = {} : exports);	