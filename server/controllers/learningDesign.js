var LdDao =      require('../dao/LdDao.js')
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
        LdDao.getLearningDesign(id, function(err, learningDesign) {
            if(err) {
                return res.send(500, err.message); 
            } else { 
                if (learningDesign.length === 0) {
                    return res.send(404, messages.LD_NOT_FOUND);
                }
                res.json(200, learningDesign[0]);
            }
        });
    }    

};