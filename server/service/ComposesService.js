module.exports = {
	
	addActivity: function(ldId, activityId) {
		// Step 1: find max level in COMPOSES for ldId -> delegate to ComposesDao
		// Step 2: insert into COMPOSES -> max level + 1 -> delegate to ComposesDao	
	}

}; 