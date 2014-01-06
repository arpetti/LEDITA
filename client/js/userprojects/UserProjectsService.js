angular.module('ledita-app')
	.factory('UserProjectsService', function($http) {
		return {

			getUserProjects: function(userId, success, error) {
				$http.get('/userprojects/' + userId).success(success).error(error);
			},

			getMyProjects: function(success, error) {
				$http.get('/userprojects').success(success).error(error);
			}

		};
	});