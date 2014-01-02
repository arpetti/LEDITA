var mysql = require('mysql');
var dao = require('./Dao.js');

var GET_USER_BY_EMAIL = 'SELECT id, name, last_name, email, hash, workplace, city, country, image_uri FROM vw_user_profile_image WHERE email = ?';
var GET_USER_BY_ID = 'SELECT id, name, last_name, email, workplace, city, country, image_uri FROM vw_user_profile_image WHERE id = ?';
var ADD_USER = 'INSERT INTO user SET ?';
var DELETE_USER = 'DELETE FROM user WHERE ?';

module.exports = {

  getUserByEmail: function(email, callback) {
    dao.findAll(GET_USER_BY_EMAIL, [email], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  getUserById: function(id, callback) {
    dao.findAll(GET_USER_BY_ID, [id], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  addUser: function(userJsonData, callback) {
    dao.insertOrUpdateRecord(ADD_USER, userJsonData, function(err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  deleteUser: function(userJsonData, callback) {
    dao.deleteRecord(DELETE_USER, userJsonData, function(err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, null);
    });
  }

};