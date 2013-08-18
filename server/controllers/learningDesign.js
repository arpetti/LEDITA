var LdDao =      require('../dao/LdDao.js')
    , LDService = require('../service/LDService')
    , messages = require('../service/ValidationMessages');

module.exports = {
    
    index: function(req, res) {
        LdDao.getLearningDesigns(function(err, learningDesigns){
            if(err) {
                return res.send(500, err.message); 
            } else { 
                res.json(200, learningDesigns);
            }
        });
    },

    findById: function(req, res) {
        var ldid = req.params.id;
        var learningDesignDetail = {};
        
        LDService.getLearningDesignPromise(ldid).then(function(results) {
            if (results.length !== LDService.LD_NUMBER_OF_DATA_ELEMENTS) {
                return res.send(400, messages.LD_DETAIL_NOT_FOUND);
            }
            var learningDesign = results[0];
            if (learningDesign.length === 0) {
                return res.send(404, messages.LD_NOT_FOUND);
            }
            learningDesignDetail = learningDesign[0];
            learningDesignDetail.subjects = results[1];
            learningDesignDetail.objectives = results[2];
            res.json(200, learningDesignDetail);
        }, function(err) {
            return res.send(500, err.message); 
        });
    }
};