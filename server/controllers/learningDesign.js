var _ =           require('underscore')
    , LdDao =      require('../dao/LdDao.js')
    , userRoles = require('../../client/js/auth/AuthRoutingConfig').userRoles;

module.exports = {
    
    index: function(req, res) {
        try {
            var learningDesigns = LdDao.getLearningDesigns(function(err, learningDesigns){
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
    }    

};