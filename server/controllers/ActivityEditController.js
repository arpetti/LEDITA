var ActivityEditService = require('../service/ActivityEditService');


// #57 wip
module.exports = {

	deleteActivity: function(req, res) {
		var activityId = req.params.actid;
        var ldId = req.params.id;

        ActivityEditService.deleteActivity(ldId, activityId, function(err, successInfo, message){
            if (err) {
                res.send(400, message);
            } else {
                res.send(200);
            }}
            );

		//console.log('ActivityEditController.deleteActivity: activityId = ' + activityId);
		//TODO: call service to delete activity
		//res.send(200);
	}

};