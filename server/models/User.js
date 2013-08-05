var User
    , _ =               require('underscore')
    , passport =        require('passport')
    , LocalStrategy =   require('passport-local').Strategy
    , UserService =     require('../service/UserService')
    , UserValidator =   require('../service/UserValidator')
    , TwitterStrategy = require('passport-twitter').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy =   require('passport-google').Strategy
    , LinkedInStrategy = require('passport-linkedin').Strategy
    , check =           require('validator').check
    , userRoles =       require('../../client/js/auth/AuthRoutingConfig').userRoles;

module.exports = {

    findOrCreateOauthUser: function(provider, providerId) {
        var user = module.exports.findByProviderId(provider, providerId);
        if(!user) {
            user = {
                id: _.max(users, function(user) { return user.id; }).id + 1,
                username: provider + '_user', // Should keep Oauth users anonymous on demo site
                role: userRoles.user,
                provider: provider
            };
            user[provider] = providerId;
            users.push(user);
        }

        return user;
    },

    findAll: function() {
        return _.map(users, function(user) { return _.clone(user); });
    },

    findById: function(id, callback) {
        UserService.findUserById(id, function(user) {
            callback(user);
        });
    },

    findByUsername: function(username) {
        return _.clone(_.find(users, function(user) { return user.username === username; }));
    },

    findByProviderId: function(provider, id) {
        return _.find(users, function(user) { return user[provider] === id; });
    },

    localStrategy: new LocalStrategy(
        function(username, password, done) {
            UserService.authenticateUser(username, password, function(err, user, info) {
                return done(err, user, info);
            });
        }
    ),

    twitterStrategy: function() {
        if(!process.env.TWITTER_CONSUMER_KEY)    throw new Error('A Twitter Consumer Key is required if you want to enable login via Twitter.');
        if(!process.env.TWITTER_CONSUMER_SECRET) throw new Error('A Twitter Consumer Secret is required if you want to enable login via Twitter.');

        return new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:8000/auth/twitter/callback'
        },
        function(token, tokenSecret, profile, done) {
            var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
            done(null, user);
        });
    },

    facebookStrategy: function() {
        if(!process.env.FACEBOOK_APP_ID)     throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');
        if(!process.env.FACEBOOK_APP_SECRET) throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');

        return new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:8000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
            done(null, user);
        });
    },

    googleStrategy: function() {

        return new GoogleStrategy({
            returnURL: process.env.GOOGLE_RETURN_URL || "http://localhost:8000/auth/google/return",
            realm: process.env.GOOGLE_REALM || "http://localhost:8000/"
        },
        function(identifier, profile, done) {
            var user = module.exports.findOrCreateOauthUser('google', identifier);
            done(null, user);
        });
    },

    linkedInStrategy: function() {
        if(!process.env.LINKED_IN_KEY)     throw new Error('A LinkedIn App Key is required if you want to enable login via LinkedIn.');
        if(!process.env.LINKED_IN_SECRET) throw new Error('A LinkedIn App Secret is required if you want to enable login via LinkedIn.');

        return new LinkedInStrategy({
            consumerKey: process.env.LINKED_IN_KEY,
            consumerSecret: process.env.LINKED_IN_SECRET,
            callbackURL: process.env.LINKED_IN_CALLBACK_URL || "http://localhost:8000/auth/linkedin/callback"
          },
           function(token, tokenSecret, profile, done) {
            var user = module.exports.findOrCreateOauthUser('linkedin', profile.id);
            done(null,user); 
          }
        );
    },

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