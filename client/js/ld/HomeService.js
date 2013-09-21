angular.module('ledita-app')
.factory('Home', function($http) {
    return {
        
        getLearningDesigns: function(success, error) {
            $http.get('/learningDesigns').success(success).error(error);
        },

        getQcers: function(success, error) {
            $http.get('/reference/qcer').success(success).error(error);
        },

        createLd: function(ldData, success, error) {
            $http.post('/learningdesign', ldData).success(function(res) {
                success(res);
            }).error(error);
        }

    };
});