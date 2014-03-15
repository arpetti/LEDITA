var activityEditService = require('../service/ActivityEditService');



// #57 wip
module.exports = {

	deleteActivity: function(req, res) {
		var activityId = req.params.actid;
        var ldId = req.params.id;

        activityEditService.deleteActivity(ldId, activityId, function(err, result, message){
            if (err) {
                res.send(400, message);
            } else {
                res.json(200, result);
            }}
            );

     //
		//console.log('ActivityEditController.deleteActivity: activityId = ' + activityId);
		//TODO: call service to delete activity
		//res.send(200);
	}

};