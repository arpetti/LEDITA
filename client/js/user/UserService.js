angular.module('ledita-app')
    .factory('UserService', function($http) {
        return {

            getUserProfiles: function(success, error) {
                $http.get('/userprofiles').success(success).error(error);
            },

            getUserById: function(userId, success, error) {
                var userUrl = '/userprofiles/' + userId;
                $http.get(userUrl).success(success).error(error);
            }



        };
    });