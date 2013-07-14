var _ =           require('underscore')
    , LdDao =      require('../dao/LdDao.js')
    , userRoles = require('../../client/js/auth/AuthRoutingConfig').userRoles;

module.exports = {
    
    index: function(req, res) {
        var learningDesigns = LdDao.getLearningDesigns(function(err, learningDesigns){
            if(err) {
                return res.send(500); 
            } else { 
                res.json(learningDesigns);
            }
        });
    }    

};