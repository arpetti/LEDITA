var User
    , passport =        require('passport')
    , LocalStrategy =   require('passport-local').Strategy
    , UserService =     require('../service/UserService')
    , userRoles =       require('../../client/js/auth/AuthRoutingConfig').userRoles;

module.exports = {

    findById: function(id, callback) {
        UserService.findUserById(id, function(user) {
            callback(user);
        });
    },

    localStrategy: new LocalStrategy(
        function(username, password, done) {
            UserService.authenticateUser(username, password, function(err, user, info) {
                return done(err, user, info);
            });
        }
    ),

    // Called by Passport
    serializeUser: function(user, done) {
        done(null, user.id);
    },

    // Called by Passport
    deserializeUser: function(id, done) {
        module.exports.findById(id, function(user) {
            if(user)    { done(null, user); }
            else        { done(null, false); }
        });
        
    }
};