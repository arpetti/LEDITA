var mysql = require('mysql')
var dao = require('./Dao');

var INSERT_ACTIVITY = 'INSERT INTO activity SET ?';
var BULK_INSERT_SUPPORTS = 'INSERT INTO supports (technology_id, activity_id) VALUES ?';
var INSERT_SUPPORT = 'INSERT INTO supports SET ?';
var INSERT_TECHNOLOGY = "INSERT INTO technology SET ?";
var BULK_INSERT_RESOURCE = "INSERT INTO resource (activity_id, name, type, descr, link) VALUES ?";

module.exports = {

	insertActivity: function(activityObj, callback) {
		dao.insertOrUpdateRecord(INSERT_ACTIVITY, activityObj, function(err, activityId) {
			dao.handleResult(callback, err, activityId);
		});
	},

	bulkInsertSupports: function(supportss, callback) {
		dao.bulkInsert(BULK_INSERT_SUPPORTS, supportss, function(err, result) {
			dao.handleResult(callback, err, result);
		});
	},

	insertSupports: function(supportsObj, callback) {
		dao.insertOrUpdateRecord(INSERT_SUPPORT, supportsObj, function(err, result) {
			dao.handleResult(callback, err, result);
		});
	},

	insertTechnology: function(technologyObj, callback) {
		dao.insertOrUpdateRecord(INSERT_TECHNOLOGY, technologyObj, function(err, technologyId) {
			dao.handleResult(callback, err, technologyId);
		});
	},

	bulkInsertResource: function(resources, callback) {
		dao.bulkInsert(BULK_INSERT_RESOURCE, resources, function(err, result) {
			dao.handleResult(callback, err, result);
		});
	}

};