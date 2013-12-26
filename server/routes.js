var _ =  require('underscore');
var path =  require('path');
var passport =  require('passport');
var LdGetService = require('./service/LdGetService');
var AuthController =  require('./controllers/AuthController');
var LdController = require('./controllers/LdController');
var LdEditController = require('./controllers/LdEditController');
var MoveNodeController = require('./controllers/MoveNodeController');
var UserProfileController = require('./controllers/UserProfileController');
var UserProfileEditController = require('./controllers/UserProfileEditController');
var ActivityController = require('./controllers/ActivityController');
var RefController = require('./controllers/RefController');
var User = require('./models/User.js');
var userRoles = require('../client/js/auth/AuthRoutingConfig').userRoles;
var accessLevels = require('../client/js/auth/AuthRoutingConfig').accessLevels;

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
        middleware: [AuthController.registerNewUser],
        accessLevel: accessLevels.public
    },
    {
        path: '/login',
        httpMethod: 'POST',
        middleware: [AuthController.login],
        accessLevel: accessLevels.public
    },
    {
        path: '/logout',
        httpMethod: 'POST',
        middleware: [AuthController.logout],
        accessLevel: accessLevels.public
    },
    {
        path: '/logout',
        httpMethod: 'GET',
        middleware: [AuthController.logout],
        accessLevel: accessLevels.public
    },

    // Learning Design - Read
    {
        path: '/learningdesigns',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, LdController.index],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesigns/:id',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, LdController.findById],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/:id',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdController.findById],
        accessLevel: accessLevels.user
    },

    // Learning Design - Create
    {
        path: '/learningdesign',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, LdController.createLd],
        accessLevel: accessLevels.user
    },

    // Learning Design - Update
    {
        path: '/learningdesign/name/:id',
        httpMethod: 'PUT',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.updateLdName],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/studentsdescr/:id',
        httpMethod: 'PUT',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.updateStudentsDescr],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/public/:id',
        httpMethod: 'PUT',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.updateLdPublic],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/private/:id',
        httpMethod: 'PUT',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.updateLdPrivate],
        accessLevel: accessLevels.user
    },
    
    // Learning Design - Create and/or Update related entities
    {
        path: '/learningdesign/scope/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.updateLdScope],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/qcer/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.updateQcers],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/addtopic/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.addTopic],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/removetopic/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.removeTopic],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/addobjective/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.addObjective],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/removeobjective/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.removeObjective],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/addprerequisite/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.addPrerequisite],
        accessLevel: accessLevels.user
    },
    {
        path: '/learningdesign/removeprerequisite/:id',
        httpMethod: 'POST',
        middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, LdEditController.removePrerequisite],
        accessLevel: accessLevels.user
    },
    {
    	path: '/learningdesign/composes/nodetonode/:id',
    	httpMethod: 'PUT',
    	middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, MoveNodeController.nodeToNode],
        accessLevel: accessLevels.user
    },
    {
    	path: '/learningdesign/activity/:id',
    	httpMethod: 'POST',
    	middleware: [ensureAuthenticated, ensureAuthorized, ensureOwner, ActivityController.createActivity],
        accessLevel: accessLevels.user
    },

    // User Profile Edit (don't need :id in path because these operate on currently logged in user)
    {
    	path: '/userprofile',
    	httpMethod: 'GET',
      middleware: [ensureAuthenticated, ensureAuthorized, UserProfileEditController.getUserProfile],
      accessLevel: accessLevels.user
    },
    {
    	path: '/userprofile/firstname',
    	httpMethod: 'PUT',
      middleware: [ensureAuthenticated, ensureAuthorized, UserProfileEditController.updateFirstName],
      accessLevel: accessLevels.user
    },

    // User Profile
    {
        path: '/userprofiles',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, UserProfileController.index],
        accessLevel: accessLevels.user
    },
    {
        path: '/userprofiles/:id',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, UserProfileController.findById],
        accessLevel: accessLevels.user
    },
    {
        path: '/uniqueusers',
        httpMethod: 'GET',
        middleware: [ensureAuthenticated, ensureAuthorized, UserProfileController.getUniqueUsers],
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
    	path: '/reference/scopes/:partial',
    	httpMethod: 'GET',
    	middleware: [ensureAuthenticated, ensureAuthorized, RefController.getScopesMatching],
        accessLevel: accessLevels.user
    },

    {
    	path: '/reference/subjects/:partial',
    	httpMethod: 'GET',
    	middleware: [ensureAuthenticated, ensureAuthorized, RefController.getSubjectsMatching],
        accessLevel: accessLevels.user
    },

    {
    	path: '/reference/objectives/:partial',
    	httpMethod: 'GET',
    	middleware: [ensureAuthenticated, ensureAuthorized, RefController.getObjectivesMatching],
        accessLevel: accessLevels.user
    },

    {
    	path: '/reference/technologies/:partial',
    	httpMethod: 'GET',
    	middleware: [ensureAuthenticated, ensureAuthorized, RefController.getTechnologiesMatching],
        accessLevel: accessLevels.user
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.public, username = '', id = '', name = '', last_name = '';
            if(req.user) {
                role = req.user.role;
                username = req.user.username; 	// eg: mario@email.it
                id = req.user.id;								// eg: 1
                name = req.user.name;						// eg: Mario
                last_name = req.user.last_name;	// eg: Rossie
            }
            res.cookie('user', JSON.stringify({
                'username': username,
                'role': role,
                'id': id,
                'name': name,
                'last_name': last_name
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

function ensureOwner(req, res, next) {
	var ldId = req.params.id;
	var userId = req.user.id
	LdGetService.isLdOwnedByUser(ldId, userId, function(err, result) {
		if(err || !result) {
			return res.send(401);
		} else {
			return next();
		}
	});

	// #47 may not need this, remove :id from private user profile path
	function ensureOwnerProfile(req, res, next) {
		var requestUserId = req.params.id;
		var loggedInUserId = req.user.id;
		if(requestUserId !== loggedInUserId) {
			return res.send(401);
		} else {
			return next();
		}
	}
}