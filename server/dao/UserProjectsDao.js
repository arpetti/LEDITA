var mysql = require('mysql');
var dao = require('./Dao');

var PUBLIC_LD = [1];
var PUBLIC_AND_PRIVATE_LD = [0, 1];

var GET_PROJECTS = 'select ld_id, ld_name, ld_scope, ld_creation_date, user_id, ld_publication, ' +
	'group_concat(qcer_name order by qcer_name ASC separator \' \') as ld_qcers from vw_ld_user_qcer ' +
	'group by ld_id, ld_name, ld_scope, ld_creation_date, user_id, ld_publication ' +
	'having user_id = ? and ld_publication in (?) ' +
	'order by ld_creation_date desc';

module.exports = {

	getPublicProjects: function(userId, callback) {
		dao.findAll(GET_PROJECTS, [userId, PUBLIC_LD], function(err, results) {
			dao.handleResult(callback, err, results);
		});
	},

	getPublicAndPrivateProjects: function(userId, callback) {
		dao.findAll(GET_PROJECTS, [userId, PUBLIC_AND_PRIVATE_LD], function(err, results) {
			dao.handleResult(callback, err, results);
		});
	}

};