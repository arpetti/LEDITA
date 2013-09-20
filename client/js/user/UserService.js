angular.module('ledita-app')
    .factory('UserProfileService', function($http) {
        return {

            getUserProfiles: function(success, error) {
                $http.get('/userprofiles').success(success).error(error);
            },

            getUniqueUsers: function(success, error) {
                $http.get('/uniqueusers').success(success).error(error);
            },

            getUserProfile: function(userId, success, error) {
                var userUrl = '/userprofiles/' + userId;
                $http.get(userUrl).success(success).error(error);
            },

            getQcers: function(success, error) {
                $http.get('/reference/qcer').success(success).error(error);
            }
        };
    });



