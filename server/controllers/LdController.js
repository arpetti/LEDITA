var LdDao =  require('../dao/LdDao.js');
var LdGetService = require('../service/LdGetService');
var LdCreateValidator = require('../validate/LdCreateValidator');
var LdCreateService = require('../service/LdCreateService');
var messages = require('../validate/ValidationMessages');

module.exports = {
    
    index: function(req, res) {
        LdGetService.getAllLearningDesigns(function(err, result, message){
            if(err) {
                return res.send(500, message); 
            } else { 
                res.json(200, result);
            }
        });
    },

    findById: function(req, res) {
        var ldid = req.params.id;
        var learningDesignDetail = {};
        
        return LdGetService.getLearningDesignPromise(ldid).then(function(results) {
            if (results.length !== LdGetService.LD_NUMBER_OF_DATA_ELEMENTS) {
                return res.send(400, messages.LD_DETAIL_NOT_FOUND);
            }
            var learningDesign = results[0];
            if (learningDesign.length === 0) {
                return res.send(404, messages.LD_NOT_FOUND);
            }
            learningDesignDetail = learningDesign[0];
            learningDesignDetail.subjects = results[1];
            learningDesignDetail.objectives = results[2];
            learningDesignDetail.prerequisites = results[3];
            learningDesignDetail.qcers = results[4];
            res.json(200, learningDesignDetail);
        }, function(err) {
            return res.send(500, err.message); 
        });
    },

    createLd: function(req, res) {
    	var ldData = req.body;

    	var ldDataErrors = LdCreateValidator.validate(ldData);
        if (ldDataErrors.length > 0) {
            return res.send(400, ldDataErrors);
        };

    	LdCreateService.createLd(req.user.id, ldData, function(err, ldid, message) {
    		if(err) {
                return res.send(500, message); 
            } else { 
            	var result = {ldid: ldid};
                res.json(200, result);
            }
    	});
    }
};