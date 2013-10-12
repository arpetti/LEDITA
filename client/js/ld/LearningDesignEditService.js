angular.module('ledita-app')
.factory('LDEditService', function($http) {
    return {
        
        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesign/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        },

        updateLdName: function(ldId, ldData, success, error) {
            $http.put('/learningdesign/name/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        }

    };
});