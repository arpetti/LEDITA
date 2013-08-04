var HashHelper = require('../util/HashHelper')
  , UserDao = require('../dao/UserDao')
  , UserRoles = require('../../client/js/auth/AuthRoutingConfig').userRoles;

module.exports = {

	// callback(err, user, info)
	authenticateUser: function(username, password, callback) {

		UserDao.getUserByEmail(username, function(err, results){
			if (err) {
				callback(err, null, {message: 'unable to retrieve user details at this time, please try again later'});
				return;
			}
			if (results.length === 0) {
				callback(null, null, {message: 'invalid username or password'});
				return;
			}
			
			var user = results[0];

			HashHelper.compareHash(password, user.hash, function(err, compareResult) {
				if (err) {
					callback(err, null, {message: 'unable to retrieve user details at this time, please try again later'});
					return;
				}
				if (!compareResult) {
					callback(null, null, {message: 'invalid username or password'});
					return;
				}
				
				user.role = UserRoles.user; // temp hack till get user roles in the database:
				user.username = user.email; // TODO: Figure out Passport mechanism for using email as username
				user.hash = null; // do not expose hash
				callback(null, user, null);
            });
        });
	},

	// callback(user)
	findUserById: function(userId, callback) {
		UserDao.getUserById(userId, function(err, results) {
			if (err) {
				callback(null);
				return;
			}
			if (results.length === 0) {
				callback(null);
				return;
			}
			var user = results[0];
			user.role = UserRoles.user; // temp hack till get user roles in the database:
			user.username = user.email; // TODO: Figure out Passport mechanism for using email as username
			callback(user);
		});
	},

	// callback(err, addedUser)
	addNewUser: function(user, hash, callback) {
		var userToBeAdded = {
			name: user.firstname,
			last_name: user.surname,
			email: user.username,
			hash: hash
		};

		UserDao.addUser(userToBeAdded, function(err, addedUserId) {
			if (err) {
				callback(err);
				return;
			}
			module.exports.findUserById(addedUserId, function(foundUser) {
				callback(null, foundUser);
			});
		});
	}

};  