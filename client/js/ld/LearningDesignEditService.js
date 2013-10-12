angular.module('ledita-app')
.factory('LDEditService', function($http) {
    return {
        
        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesign/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        }

    };
});