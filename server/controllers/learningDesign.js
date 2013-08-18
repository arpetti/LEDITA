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
        var id = req.params.id;
        LDService.getLearningDesignDetail(id, function(err, message, learningDesignDetail) {
            if(err) {
                return res.send(500, err.message); 
            } else if(message) { 
                return res.send(404, message);
            } else {
                res.json(200, learningDesignDetail);
            }
        });
    }    

};