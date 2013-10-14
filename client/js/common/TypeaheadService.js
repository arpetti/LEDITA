angular.module('ledita-app')
.factory('TypeaheadHelper', function($http, limitToFilter) {
    return {

    	getScopes: function(scope) {
    		var scopeMatchUrl = '/reference/scopes/' + scope;
			return $http.get(scopeMatchUrl).then(function(response) {
				return limitToFilter(response.data, 15);
			});
    	}
        
    };
});