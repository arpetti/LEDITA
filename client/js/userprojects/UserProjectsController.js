angular.module('ledita-app')
	.controller('UserProjectsCtrl', ['$scope', '$routeParams', 'UserProjectsService',
		function($scope, $routeParams, UserProjectsService) {

			$scope.userid = $routeParams.userid;

			UserProjectsService.getUserProjects($scope.userid, function(res) {
				$scope.userInfo = res.userInfo;
				$scope.userProjects = res.userProjects;
			}, function(err) {
				$scope.error = err; //TODO UI to display this
			});

		}
	]);