var mysql = require('mysql')
var dao = require('./Dao');

var INSERT_STUDENTS = 'INSERT INTO students SET ?';

module.exports = {

	insertStudents: function(data, callback) {
		dao.insertOrUpdateRecord(INSERT_STUDENTS, data, function(err, studentsId) {
			if(err) {
				callback(err);
			} else {
				callback(null, studentsId);
			}
		});
	}

};