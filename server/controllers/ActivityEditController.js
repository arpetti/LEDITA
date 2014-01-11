// #57 wip
module.exports = {

	deleteActivity: function(req, res) {
		var activityId = req.params.actid;
		console.log('ActivityEditController.deleteActivity: activityId = ' + activityId);
		//TODO: call service to delete activity
		res.send(200);
	}

};