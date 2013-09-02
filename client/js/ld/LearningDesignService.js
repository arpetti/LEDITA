angular.module('ledita-app')
.factory('LDService', function($http) {
    return {
        
        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesigns/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        },

        getActivities: function(ldid, success, error) {
        	var activityUrl = "/learningdesignstructure/" + ldid;
        	$http.get(activityUrl).success(success).error(error);
        },

        getBoxClass: function(node) {
            if (node.type === 'ACTIVITY') {
                return 'actBox';
            }
            if (node.type === 'LD') {
                return 'ldBox';
            }
            if (node.type === 'ACTIVITY_GROUP') {
                if (node.max_position >= 1 && node.max_position <= 4) {
                    return 'groupBox' + node.max_position;
                }
            } 
            console.log('WARNING: Could not determine box class for node.');
            return '';
        }
        
    };
});