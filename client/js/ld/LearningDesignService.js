angular.module('ledita-app')
.factory('LDService', function($http) {
    return {
        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesigns/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        }
    };
});