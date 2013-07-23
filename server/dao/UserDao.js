var mysql = require('mysql')
  , dao = require('./Dao.js');

var QUERY_GET_USER_BY_EMAIL = 'SELECT email FROM user WHERE email = ?';

module.exports = {

  getUserByEmail: function(email, callback) {
    dao.findAll(QUERY_GET_USER_BY_EMAIL, [email], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

};