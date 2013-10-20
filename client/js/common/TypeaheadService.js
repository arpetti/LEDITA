angular.module('ledita-app')
.factory('TypeaheadHelper', function($http, limitToFilter) {
    return {

    	getMaxNumberResults: function() {
    		return 15;
    	},

    	getScopes: function(scope) {
    		var scopeMatchUrl = '/reference/scopes/' + scope;
			var maxNumResults = this.getMaxNumberResults();
			return $http.get(scopeMatchUrl).then(function(response) {
				return limitToFilter(response.data, maxNumResults);
			});
    	},

    	getSubjects: function(subject) {
    		var subjectMatchUrl = '/reference/subjects/' + subject;
    		var maxNumResults = this.getMaxNumberResults();
			return $http.get(subjectMatchUrl).then(function(response) {
				return limitToFilter(response.data, maxNumResults);
			});
    	},

    	getObjectives: function(objective) {
    		var objectiveMatchUrl = '/reference/objectives/' + objective;
    		var maxNumResults = this.getMaxNumberResults();
			return $http.get(objectiveMatchUrl).then(function(response) {
				return limitToFilter(response.data, maxNumResults);
			});
    	}
        
    };
});