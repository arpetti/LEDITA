var _ =           require('underscore')
    , path =      require('path')
    , passport =  require('passport')
    , AuthCtrl =  require('./controllers/auth')
    , LearningDesignCtrl = require('./controllers/learningDesign')
    , UserProfileCtrl = require('./controllers/UserProfileController')
    , ActivityController       = require('./controllers/ActivityController')
    , RefController       = require('./controllers/RefController')
    , User =      require('./models/User.js')
    , userRoles = require('../client/js/auth/AuthRoutingConfig').userRoles
    , accessLevels = require('../client/js/auth/AuthRoutingConfig').accessLevels;

var routes = [

    // Views
    {
        path: '/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = req.url.slice(1, req.url.length) + '.html';
            res.render(requestedView);
        }],
        accessLevel: accessLevels.public
    },

    // Local Auth
    {
        path: '/registernewuser',
        httpMethod: 'POST',
        middleware: [AuthCtrl.registerNewUser],
        accessLevel: accessLevels.public
    },
    {
        path: '/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login],
        accessLevel: accessLevels.public
    },
    {
        path: '/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout],
        accessLevel: accessLevels.public
    },

    // Learning Design
    {
        path: '/learningdesigns',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, LearningDesignCtrl.index],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesigns/:id',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, LearningDesignCtrl.findById],
        accessLevel: accessLevels.user
    },

    // User Profile
    {
        path: '/userprofiles',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, UserProfileCtrl.index],
        accessLevel: accessLevels.user
    },
    {
        path: '/userprofiles/:id',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, UserProfileCtrl.findById],
        accessLevel: accessLevels.user
    },

    // Activity
    {
        path: '/learningdesignstructure/:id',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, ActivityController.getLDNodes],
        accessLevel: accessLevels.user
    },

    // Reference Data
    {
    	path: '/reference/qcer',
    	httpMethod: 'GET',
    	middleware: [ensureAuthenticated, ensureAuthorized, RefController.getQcers],
        accessLevel: accessLevels.user
    },

    {
    	path: '/reference/subjects/:partial',
    	httpMethod: 'GET',
    	middleware: [ensureAuthenticated, ensureAuthorized, RefController.getSubjectsMatching],
        accessLevel: accessLevels.user
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.public, username = '';
            if(req.user) {
                role = req.user.role;
                username = req.user.username;
            }
            res.cookie('user', JSON.stringify({
                'username': username,
                'role': role
            }));
            res.render('index.html');
        }],
        accessLevel: accessLevels.public
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }                      
}

function ensureAuthorized(req, res, next) {
    if(!req.user) {
        return res.send(401);
    } 
    var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;
    if(!(accessLevel.bitMask & req.user.role.bitMask)) return res.send(403);

    return next();
}