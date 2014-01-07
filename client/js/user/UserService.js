angular.module('ledita-app')
    .factory('UserProfileService', function($http) {
        return {

            getUniqueUsers: function(success, error) {
                $http.get('/uniqueusers').success(success).error(error);
            }
            
        };
    });



