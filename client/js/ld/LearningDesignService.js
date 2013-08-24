angular.module('ledita-app')
.factory('LDService', function($http) {
    return {
        
        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesigns/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        },

        getActivities: function(ldid, success, error) {
        	var activityUrl = "/mockdata/ldactivity" + ldid + ".json";
        	$http.get(activityUrl).success(success).error(error);
        }
        
    };
});