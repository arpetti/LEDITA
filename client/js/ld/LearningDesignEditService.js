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

    	extractTopicNames: function(ldTopics) {
    		return _.pluck(ldTopics, 'subject_name');
    	},

    	extractObjectiveNames: function(ldOjectives) {
    		return _.pluck(ldOjectives, 'objective_descr');
    	},

    	extractPrerequisiteNames: function(ldPrereqs) {
    		return _.pluck(ldPrereqs, 'prereq_name');
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

        updateActivityLevelPosition: function(ldId, sourceTargetData, success, error) {
        	$http.put('/learningdesign/composes/nodetonode/' + ldId, sourceTargetData).success(function(res) {
                success(res);
            }).error(error);
        },

        addTopic: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/addtopic/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        removeTopic: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/removetopic/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        addObjective: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/addobjective/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        removeObjective: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/removeobjective/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        addPrerequisite: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/addprerequisite/' + ldId, ldData).success(function(res) {
                success(res);
            }).error(error);
        },

        removePrerequisite: function(ldId, ldData, success, error) {
            $http.post('/learningdesign/removeprerequisite/' + ldId, ldData).success(function(res) {
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
        },

        getBoxEditClass: function(node) {
            if (node.type === 'ACTIVITY') {
                return 'actBoxEdit';
            }
            if (node.type === 'LD') {
                return 'ldBoxEdit';
            }
            if (node.type === 'ACTIVITY_GROUP') {
                if (node.max_position >= 1 && node.max_position <= 4) {
                    return 'groupBoxEdit' + node.max_position;
                }
            }
            console.log('WARNING: Could not determine box class for node.');
            return '';
        },

        getGroupEditBoxClass: function(node) {
            if (node.group_child_type === 'ACTIVITY') {
                return 'actBoxEdit';
            }
            if (node.group_child_type === 'LD') {
                return 'ldBoxEdit';
            }
            console.log('WARNING: Could not determine box class for node.');
            return '';
        }

    };
});