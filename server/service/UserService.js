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
				user.hash = null; // do not expose hash
				callback(null, user, null);
            });
        });
		
	}

};  