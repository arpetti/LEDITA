(function(exports){

	// For this to work, need to make sure that test database is seeded with sample users
	var users = [
		{
			username:   "user@test.com",
			password:   "123",
		},
		{
			username:   "admin@test.com",
			password:   "456",
		}
	];

	exports.getUserName = getUserName(users[0]);
	exports.getUserPassword = getUserPassword(users[0]);
	exports.getAdminUserName = getUserName(users[1]);
	exports.getAdminUserPassword = getUserPassword(users[1]);

	function getUserName(user) {
		return user.username;
	};

	function getUserPassword(user) {
		return user.password;
	};


})(typeof exports === 'undefined' ? this['testUsers'] = {} : exports);	