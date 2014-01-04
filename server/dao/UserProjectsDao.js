var mysql = require('mysql');
var dao = require('./Dao');

var GET_PUBLIC_PROJECTS = 'select ld_id, ld_name, ld_scope, ld_creation_date, user_id, ld_publication, ' +
	'group_concat(qcer_name order by qcer_name ASC separator \' \') as ld_qcers from vw_ld_user_qcer ' +
	'group by ld_id, ld_name, ld_scope, ld_creation_date, user_id, ld_publication ' +
	'having user_id = ? and ld_publication = 1 ' +
	'order by ld_creation_date desc';

module.exports = {

	getPublicProjects: function(userId, callback) {
		dao.findAll(GET_PUBLIC_PROJECTS, [userId], function(err, results) {
			if(err){
				callback(err);
			} else {
				callback(null, results);
			}
		});
	}

};