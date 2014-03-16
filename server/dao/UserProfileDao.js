var mysql = require('mysql')
    , dao = require('./Dao');

var GET_USER_PROFILES = 'SELECT user_id, image_id, user_name, last_name, workplace, city, country, vw_user_profile.ld_id, ld_name, scope, creation_date from vw_user_profile where publication = 1 ';
var GET_USER_PROFILE = GET_USER_PROFILES + ' AND user_id = ?';
var GET_UNIQUE_USERS = 'SELECT  id, image_id, name, last_name, workplace, city, country from user';

var GET_LD_QCERS = 'select qcer_name from vw_ld_qcer where ld_id in (?) order by qcer_name';
var GET_LD_QCERS_WITH_LD_ID = 'select ld_id, qcer_name from vw_ld_qcer where ld_id in (?)';

module.exports = {

    getUserProfiles: function(callback) {
        dao.findAll(GET_USER_PROFILES, [], function(err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    },

    getUserProfile: function(id, callback) {
        dao.findAll(GET_USER_PROFILE, [id], function(err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    },

    getUniqueUsers: function(callback) {
        dao.findAll(GET_UNIQUE_USERS, [], function(err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    },

    getQcers: function(ldid, callback) {
        dao.findAll(GET_LD_QCERS, [ldid], function(err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    },

    getQcersWithLdId: function(ldid, callback) {
        dao.findAll(GET_LD_QCERS_WITH_LD_ID, [ldid], function(err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

};