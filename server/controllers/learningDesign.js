var LdDao =      require('../dao/LdDao.js')
    , userRoles = require('../../client/js/auth/AuthRoutingConfig').userRoles;

module.exports = {
    
    index: function(req, res) {
        try {
            LdDao.getLearningDesigns(function(err, learningDesigns){
                if(err) {
                    return res.send(500, err.message); 
                } else { 
                    res.json(learningDesigns);
                }
            });
        }
        catch(err) {
            return res.send(500, err.message);
        }
    },

    findById: function(req, res) {
        try {
            var id = req.params.id;
            LdDao.getLearningDesign(id, function(err, learningDesign) {
                if(err) {
                    return res.send(500, err.message); 
                } else { 
                    if (learningDesign.length === 0) {
                        return res.send(404, "Learning Design not found");
                    }
                    res.json(learningDesign[0]);
                }
            });
        }
        catch(err) {
            return res.send(500, err.message);
        }
    }    

};