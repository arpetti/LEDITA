/*
name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: {"3": true, "6": false},
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
*/
module.exports = {

	buildLd: function() {
		var name = "My Learning Design";
		var qcers = {"3": true, "6": false};

		return {
			withName: function(anotherName) {
				name = anotherName;
				return this;
			},
			withQcers: function(anotherQcers) {
				qcers = anotherQcers;
				return this;
			},
			build: function() {
				return "name is: " + name + ", qcers is: " + JSON.stringify(qcers);
			}
		}
	}
};