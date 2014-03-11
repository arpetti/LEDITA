'use strict';

/* Controllers */

angular.module('ledita-app')
.controller('AppCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    }

}]);

angular.module('ledita-app')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                if (err && err.message) {
                    $rootScope.error = err.message;
                } else {
                    $rootScope.error = "Failed to login.";
                }
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}]);


angular.module('ledita-app')
.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function() {
        Auth.register({
                firstname: $scope.firstname,
                surname: $scope.surname,
                username: $scope.username,
                password: $scope.password,
                terms: $scope.terms,
                role: $scope.role
            },
            function() {
                $scope.alertMsg = null; // clear the error message on successful registration
                $location.path('/useredit');
            },
            function(err) {
                $scope.alertMsg = err;
            });
    };

    $scope.openTerms = function () {
        $scope.termsModal = true;
       };

    $scope.closeTerms = function () {
        $scope.termsModal = false;
    };

    $scope.openPrivacy = function () {
        $scope.privacy = true;
       };

    $scope.closePrivacy = function () {
        $scope.privacy = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };


}]);

angular.module('ledita-app')
.controller('AdminCtrl',
['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });

}]);

