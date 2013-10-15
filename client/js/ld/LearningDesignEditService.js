angular.module('ledita-app')
.factory('LDEditService', function($http, _) {
    return {

    	// #28 wip on binding selected qcers, for now just verify we can call underscore from angular
    	generateSelectedQcers: function() {
    		var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    		var stoogeNames = _.pluck(stooges, 'name')
			console.log('underscore is working: ' + JSON.stringify(stoogeNames));
    	},
        
        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesign/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        },

        updateLdName: function(ldId, ldData, success, error) {
            $http.put('/learningdesign/name/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        updateLdScope: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/scope/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        updateStudentsDescr: function(ldId, ldData, success, error) {
            $http.put('/learningdesign/studentsDescr/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        updateLdPublic: function(ldId, success, error) {
            $http.put('/learningdesign/public/' + ldId).success(function(res) {
                success(res);
            }).error(error);
        },

        updateLdPrivate: function(ldId, success, error) {
            $http.put('/learningdesign/private/' + ldId).success(function(res) {
                success(res);
            }).error(error);
        }

    };
});