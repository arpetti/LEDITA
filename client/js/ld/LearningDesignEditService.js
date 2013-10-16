angular.module('ledita-app')
.factory('LDEditService', function($http, _) {
    return {

        getLearningDesign: function(ldId, success, error) {
        	var ldUrl = '/learningdesign/' + ldId;
            $http.get(ldUrl).success(success).error(error);
        },

    	buildList: function(size, value) {
    		var result = [];
    		for(var i=0; i<size; i++) {
    			result.push(value);
    		}
    		return result;
    	},

		/**
		 * Returns an object of each LD selected qcer ID with true flag.
		 *
		 * @param {list} ldQcers, the current list of selected qcers for an LD, for example 
		 *	[{"qcer_name": "A1"}, {"qcer_name": "A2"}]
		 *
		 * @param {list} qcerOpts, all possible qcer id/name pairs, for example: 
		 *	[{"id":1,"name":"A1"},{"id":2,"name":"A2"},{"id":3,"name":"B1"},{"id":4,"name":"B2"},{"id":5,"name":"C1"},{"id":6,"name":"C2"}] 
		 *
		 * @return {object} ID of each selected qcer with true flag, for example: 
		 *	{"1":true,"2":true}
		 */
    	generateSelectedQcers: function(ldQcers, qcerOpts) {
			var ldQcerNames = _.pluck(ldQcers, 'qcer_name'); 
			var ldQcerIds = _.map(ldQcerNames, function(element) {
					return _.pluck(_.where(qcerOpts, {'name': element}), 'id'); 
				});
			var ldQcerIdsFlat = _.flatten(ldQcerIds)
			return _.object(ldQcerIdsFlat, this.buildList(ldQcerIdsFlat.length, true));
    	},

    	// #28 wip - sample input: [{"subject_name":"Topic 1"},{"subject_name":"Topic 5"}] 
    	extractTopicNames: function(ldTopics) {
    		console.log('extractTopicNames: ' + JSON.stringify(ldTopics));
    		return [];
    	},

    	// #28 wip - sample input: [{"objective_descr":"Objective 1"},{"objective_descr":"Objective 6"}] 
    	extractObjectiveNames: function(ldOjectives) {
    		console.log('extractObjectiveNames: ' + JSON.stringify(ldOjectives));
    		return [];
    	},

    	// #28 wip - sample input: [{"prereq_name":"Objective 1","prereq_type":"OBJECTIVE"},{"prereq_name":"Objective 2","prereq_type":"OBJECTIVE"}]  
    	extractPrereqNames: function(ldPrereqs) {
    		console.log('extractPrereqNames: ' + JSON.stringify(ldPrereqs));
    		return [];
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

        updateLdQcers: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/qcer/' + ldId, ldData).success(function(res) {
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