var mysql = require('mysql')
  , dao = require('./Dao.js');

var QUERY_GET_USER_BY_EMAIL = 'SELECT email FROM user WHERE email = ?';

//TODO: Remove salt from user table model because bcrypt doesn't require that salt be persisted
//TODO: Ask Alessandro if gender is really required, we do not collect it on registration form so will not have a value here
//TODO: Increase size of hash column in data model to support bcrypt
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