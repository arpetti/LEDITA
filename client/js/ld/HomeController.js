angular.module('ledita-app')
.controller('HomeCtrl',
['$scope', 'Home', function($scope, Home) {
    $scope.loading = true;

    // TODO: Infinite Scroll http://binarymuse.github.io/ngInfiniteScroll/demo_basic.html

    Home.getLearningDesigns(function(res) {
        $scope.learningDesigns = res;
        $scope.loading = false;
    }, function(err) {
        $scope.error = "Failed to fetch learning designs.";
        $scope.loading = false;
    });

}]);

angular.module('ledita-app')
.controller('NavActionCtrl',
['$scope', function($scope) {
    $scope.createLD = function () {
        $scope.beOpen = true;
    };

    $scope.closeLD = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.beOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade:true,
        backdropClick: false
    };

}]);

angular.module('ledita-app')
.controller('LdCreateCtrl',
['$scope', '$http', 'Home', 'limitToFilter', function($scope, $http, Home, limitToFilter) {

	Home.getQcers(function(res) {
        $scope.qceropts = res;
    }, function(err) {
        $scope.qcerError = err;
    });
    
    $scope.selectedQcers = {};

    $scope.getSubjects = function(subject) {
    	var subjectMatchUrl = '/reference/subjects/' + subject;
		return $http.get(subjectMatchUrl).then(function(response) {
			return limitToFilter(response.data, 15);
		});
  	};

}]);