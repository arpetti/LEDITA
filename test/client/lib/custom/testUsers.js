(function(exports){

	// For this to work, need to make sure that test database is seeded with sample users
	var users = [
		{
			username:   "sara@email.it",
			password:   "passw0rD",
		},
		{
			username: "user@test.com",
			password: "123"
		}
	];

	exports.getUserName = getUserName(users[0]);
	exports.getUserPassword = getUserPassword(users[0]);

	// temporarily required because login is real but registration is still fake
	exports.getOldUserName = getUserName(users[1]);
	exports.getOldUserPassword = getUserPassword(users[1]);

	function getUserName(user) {
		return user.username;
	};

	function getUserPassword(user) {
		return user.password;
	};


})(typeof exports === 'undefined' ? this['testUsers'] = {} : exports);	