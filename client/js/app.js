'use strict';

angular.module('ledita-app', ['ngCookies', 'infinite-scroll', 'ui.bootstrap', 'ui.keypress', 'activityDurationDisplay', 'underscore', 'angularFileUpload'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

        var access = AuthRoutingConfig.accessLevels;

        $routeProvider.when('/',
            {
                templateUrl: '/partials/home',
                controller: 'HomeCtrl',
                access: access.user
            });
        $routeProvider.when('/ld/:ldid',
            {
                templateUrl: '/partials/ld',
                controller: 'LdViewCtrl',
                access: access.user
            });
        $routeProvider.when('/ldedit/:ldid',
            {
                templateUrl: '/partials/ldedit',
                controller: 'LdEditCtrl',
                access: access.user
            });
        $routeProvider.when('/user/:userid',
            {
                templateUrl: '/partials/user',
                controller: 'UserProjectsCtrl',
                access: access.user
            });
        $routeProvider.when('/useredit',
            {
                templateUrl: '/partials/useredit',
                controller: 'UserProfileEditCtrl',
                access: access.user
            });
        $routeProvider.when('/users',
            {
                templateUrl: '/partials/users',
                controller: 'UserProfileCtrl',
                access: access.user
            });
        $routeProvider.when('/lds',
            {
                templateUrl: '/partials/lds',
                controller: 'HomeCtrl',
                access: access.user
            });
          $routeProvider.when('/userlds',
            {
                templateUrl: '/partials/userlds',
                controller: 'HomeCtrl',
                access: access.user
            });
        $routeProvider.when('/login',
            {
                templateUrl: '/partials/login',
                controller: 'LoginCtrl',
                access: access.anon
            });
        $routeProvider.when('/register',
            {
                templateUrl: '/partials/register',
                controller: 'RegisterCtrl',
                access: access.anon
            });
        $routeProvider.when('/auth/twitter',
            {
                templateUrl: '/partials/register',
                controller: 'RegisterCtrl',
                access: access.anon
            });
        $routeProvider.when('/404',
            {
                templateUrl: '/partials/404',
                access: access.public
            });
        $routeProvider.otherwise({redirectTo: '/404'});

        $locationProvider.html5Mode(true);

        var interceptor = ['$location', '$q', function ($location, $q) {
            function success(response) {
                return response;
            }

            function error(response) {

                if (response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }

            return function (promise) {
                return promise.then(success, error);
            }
        }];

        $httpProvider.responseInterceptors.push(interceptor);

    }])

    .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if (Auth.isLoggedIn()) {
                    $location.path('/');
                } else {
                    $location.path('/login');
                }
            }
        });

    }]);

function Tabs($scope, $timeout) {
    $scope.data = {};
    $timeout(function () {
        $scope.data.static1 = true;
    }, 0)

};


