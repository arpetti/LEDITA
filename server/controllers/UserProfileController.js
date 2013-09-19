var UserProfileDao =      require('../dao/UserProfileDao.js')
    , UserProfileService = require('../service/UserProfileService')
    , messages = require('../service/ValidationMessages');

module.exports = {

    index: function(req, res) {
        UserProfileService.getAllUserProfiles(function(err, result, message){
            if(err) {
                return res.send(500, message);
            } else {
                res.json(200, result);
            }
        });
    },

    findById: function(req, res) {
        var userid = req.params.id;
        var UserProfileDetail = {};

        return UserProfileService.getUserProfilePromise(userid).then(function(results) {
            if (results.length !== UserProfileService.USER_NUMBER_OF_DATA_ELEMENTS) {
                return res.send(400, messages.USER_DETAIL_NOT_FOUND);
            }
            var userProfile = results[0];
            if (userProfile.length === 0) {
                return res.send(404, messages.USER_NOT_FOUND);
            }
            UserProfileDetail = userProfile[0];
            UserProfileDetail.qcers = results[1];
            res.json(200, UserProfileDetail);
        }, function(err) {
            return res.send(500, err.message);
        });
    }
};