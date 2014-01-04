angular.module('ledita-app')
	.factory('UserProjectsService', function($http) {
		return {

			getUserProjects: function(userId, success, error) {
				$http.get('/userprojects/' + userId).success(success).error(error);
			}

		};
	});