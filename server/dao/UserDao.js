var mysql = require('mysql')
  , dao = require('./Dao.js');

var QUERY_GET_USER_BY_EMAIL = 'SELECT id, name, last_name, gender, email, hash, workplace, city, country FROM user WHERE email = ?';

//TODO: Add constraint on user table to ensure email is unique
var QUERY_ADD_USER = 'INSERT INTO user SET ?';
var QUERY_DELETE_USER = 'DELETE FROM user WHERE ?';

module.exports = {

  getUserByEmail: function(email, callback) {
    dao.findAll(QUERY_GET_USER_BY_EMAIL, [email], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  addUser: function(userJsonData, callback) {
    dao.insertRecord(QUERY_ADD_USER, userJsonData, function(err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  deleteUser: function(userJsonData, callback) {
    dao.insertRecord(QUERY_DELETE_USER, userJsonData, function(err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  }

};