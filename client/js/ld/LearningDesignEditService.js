angular.module('ledita-app')
.factory('LDEditService', function($http) {
    return {
        
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