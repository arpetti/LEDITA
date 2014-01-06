angular.module('ledita-app')
	.controller('MyProjectsCtrl', ['$scope', 'UserProjectsService',
		function($scope, UserProjectsService) {

			UserProjectsService.getMyProjects(function(res) {
				$scope.myProjects = res;
			}, function(err) {
				$scope.error = err; //TODO UI to display this
			});

		}
	]);