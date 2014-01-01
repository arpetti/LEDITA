var chai = require('chai');
var expect = require('chai').expect
var fixture = require('../../../server/dao/UserProfileEditDao');
var async = require('async');
var dao = require('../../../server/dao/Dao');

describe('User Profile Edit DAO', function() {

	var userIdToEdit = 5;
	var verifyUserUpdated = 'select id, image_id, name, last_name, email, workplace, city, country from user where id = ?';
	var resetUser = 'update user set name = ?, last_name = ?, email = ?, workplace = ?, city = ?, country = ? where id = ?';
	var resetUserData = ['Silvia', 'Rosa', 'silvia@email.it', 'Scuola E', 'Pechino', 'Cina', userIdToEdit];

	it('Updates first name', function(done) {
		var modifiedFirstName = 'Silvania';
		async.series([
				function(callback) {
					fixture.updateFirstName(userIdToEdit, modifiedFirstName, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile First Name');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].name).to.equal(modifiedFirstName);
						callback(null, 'Step 2: Verified First Name Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});
	
	it('Updates last name', function(done) {
		var modifiedLastName = 'Rosalind';
		async.series([
				function(callback) {
					fixture.updateLastName(userIdToEdit, modifiedLastName, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile Last Name');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].last_name).to.equal(modifiedLastName);
						callback(null, 'Step 2: Verified Last Name Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});

	it('Updates email', function(done) {
		var modifiedEmail = 'silvania.rosalind.gmail.test';
		async.series([
				function(callback) {
					fixture.updateEmail(userIdToEdit, modifiedEmail, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile Email');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].email).to.equal(modifiedEmail);
						callback(null, 'Step 2: Verified Email Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});

	it('Updates workplace', function(done) {
		var modifiedWorkplace = 'University of Toronto';
		async.series([
				function(callback) {
					fixture.updateWorkplace(userIdToEdit, modifiedWorkplace, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile Workplace');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].workplace).to.equal(modifiedWorkplace);
						callback(null, 'Step 2: Verified Workplace Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});

	it('Updates city', function(done) {
		var modifiedCity = 'Toronto';
		async.series([
				function(callback) {
					fixture.updateCity(userIdToEdit, modifiedCity, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile City');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].city).to.equal(modifiedCity);
						callback(null, 'Step 2: Verified City Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});

	it('Updates country', function(done) {
		var modifiedCountry = 'Canada';
		async.series([
				function(callback) {
					fixture.updateCountry(userIdToEdit, modifiedCountry, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile country');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].country).to.equal(modifiedCountry);
						callback(null, 'Step 2: Verified country Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});

	it('Updates image', function(done) {
		var modifiedImageId = 1; // known from demo data to be valid image
		async.series([
				function(callback) {
					fixture.updateImage(userIdToEdit, modifiedImageId, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 1: Updated User Profile image');
					});
				},
				function(callback) {
					dao.findAll(verifyUserUpdated, [userIdToEdit], function(err, result) {
						expect(err).to.be.null;
						expect(result).to.have.length(1);
						expect(result[0].id).to.equal(userIdToEdit);
						expect(result[0].image_id).to.equal(modifiedImageId);
						callback(null, 'Step 2: Verified image Updated');
					});
				},
				function(callback) {
					dao.insertOrUpdateRecord(resetUser, resetUserData, function(err, result) {
						expect(err).to.be.null;
						callback(null, 'Step 3: Reset User Profile');
					});
				}
			],
			function(err, results) {
				console.log('results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(3);
				done();
			});
	});

});