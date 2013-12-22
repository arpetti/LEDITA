var passport =  require('passport')
    , User = require('../models/User.js')
    , UserValidator = require('../validate/UserValidator')
    , UserService = require('../service/UserService')
    , HashHelper = require('../util/HashHelper')
    , ConfigHelper = require('../util/ConfigHelper')
    , config = ConfigHelper.config();

module.exports = {
    
    registerNewUser: function(req, res, next) {
        var user = req.body;
        
        var registrationErrors = UserValidator.validate(user);
        if (registrationErrors.length > 0) {
            return res.send(400, registrationErrors);
        }

        UserValidator.validateExists(user.username, function(err, message) {
            if(err) {
                return res.send(500);
            }
            if (message) {
                return res.send(403, message);
            } else {
                HashHelper.generateHash(user.password, function(err, hash) {
                    if(err) {
                        return res.send(500);
                    }
                    UserService.addNewUser(user, hash, function(err, addedUser) {
                        if(err) {
                            return res.send(500);
                        }
                        req.logIn(addedUser, function(err) {
                            if(err)     { next(err); }
                            // This must return same structured response as res.cookie set in routes.js
                            else        { res.json(200, 
                            	{ 
                            		"role": addedUser.role, 
                            		"username": addedUser.username,
                            		"id": addedUser.id,
                								"name": addedUser.name,
                								"last_name": addedUser.last_name
                            	}); 
                          	}
                        });
                    });
                });
            }
        });

    },

    login: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if(err) {
                return next(err); 
            }
            if(!user) { 
                return res.send(400, info); 
            }
            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }
                if(req.body.rememberme) {
                    req.session.cookie.maxAge = config.remember_me_ms;
                }
                // This must return same structured response as res.cookie set in routes.js
                res.json(200, 
                	{
                		"role": user.role, 
                		"username": user.username,
                		"id": user.id,
                		"name": user.name,
                		"last_name": user.last_name
                	});
            });
        })(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        res.send(200);
    }
};