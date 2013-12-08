var dao = require('./Dao');

var FIND_STUDENTS_TYPE = 'select type, description from students_type where type = ?';
var INSERT_STUDENTS = 'insert into students set ?';

var handleResult = function(cb, err, results) {
	if(err) {
		cb(err);
	} else {
		cb(null, results);
	}
};

module.exports = {
	
	findStudentsType: function(type, cb) {
		dao.findAll(FIND_STUDENTS_TYPE, [type], function(err, results) {
      handleResult(cb, err, results);
    });
	},

	insertStudents: function(studentsObj, cb) {
		dao.insertOrUpdateRecord(INSERT_STUDENTS, studentsObj, function(err, insertId) {
			handleResult(cb, err, insertId);
		});
	}

}; 