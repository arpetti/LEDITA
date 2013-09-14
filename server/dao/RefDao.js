var mysql = require('mysql')
var dao = require('./Dao');

var GET_QCERS = 'select id, name from qcer order by name';

module.exports = {

	getQcers: function(callback) {
    dao.findAll(GET_QCERS, [], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

};
