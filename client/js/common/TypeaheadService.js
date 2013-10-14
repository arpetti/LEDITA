angular.module('ledita-app')
.factory('TypeaheadHelper', function($http, limitToFilter) {
    return {

    	getScopes: function(scope) {
    		var scopeMatchUrl = '/reference/scopes/' + scope;
			return $http.get(scopeMatchUrl).then(function(response) {
				return limitToFilter(response.data, 15);
			});
    	},

    	getSubjects: function(subject) {
    		var subjectMatchUrl = '/reference/subjects/' + subject;
			return $http.get(subjectMatchUrl).then(function(response) {
				return limitToFilter(response.data, 15);
			});
    	},

    	getObjectives: function(objective) {
    		var objectiveMatchUrl = '/reference/objectives/' + objective;
			return $http.get(objectiveMatchUrl).then(function(response) {
				return limitToFilter(response.data, 15);
			});
    	}
        
    };
});