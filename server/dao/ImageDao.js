var mysql = require('mysql');
var dao = require('./Dao.js');

var INSERT_IMAGE = 'insert into image set ?';

module.exports = {

	insertImage: function(imageData, callback) {
		dao.insertOrUpdateRecord(INSERT_IMAGE, imageData, function(err, imageId) {
			if(err) {
				callback(err);
			} else {
				callback(null, imageId);
			}
		});
	}

};