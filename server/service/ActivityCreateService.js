var async = require('async');

module.exports = {

	return {

		createActivity: function(ldId, activityData) {
			// Sample Data:
			// {
			// 	"actName":"my activity name",										name
			// 	"modality":"1",																	modality
			//	"dur_mon":1,																		dur_mon
			// 	"dur_d":2,																			dur_dd
			// 	"dur_h":3,																			dur_hh
			// 	"dur_min":4,																		dur_min
			// 	"org":"1",																			--> ref: students_type.type
			//	"group_number":5,																--> insert: students.group_number
			//	"people_per_group":6,														--> insert: students.people_per_group
			// 	"technologies":["Whiteboard","touch screen"],		--> get activity.id after insert, pass to TechnologyService
			// 	"pract_descr":"long description",								pract_descr
			// 	"edu_descr":"pedagogical long description"			edu_descr
			// }

			// Step 1: Delegate to StudentsService --> get students_id
			// Step 2: Insert into ACTIVITY --> delegate to ActivityCreateDao
			// Step 3: get activity.id and delegate to TechnologyService, passing tchnologies

		};

	};

};