var chai = require('chai');
var expect = require('chai').expect
chai.use(require('chai-datetime'));

var LdEditDao = require('../../../server/dao/LdEditDao');
var Dao = require('../../../server/dao/Dao');

describe('LD Edit', function () {

	var ldIdToEdit = 27;
	
	var ldOriginalLastEditDate = new Date('2013-01-11 22:21:26');
	var ldOriginalName = 'Learning Design Title Demo 27';
	var ldOriginalStudentsDescr = '20 studenti adolescenti di livello B1';
	
	var verifyLd = 'SELECT id, name, publication, students_profile, last_edit_date FROM ld where id = ?';
	var resetLd = 'UPDATE ld SET name = ?, last_edit_date = ? WHERE id = ?';
	var resetStudentsDescr = 'UPDATE ld SET students_profile = ?, last_edit_date = ? WHERE id = ?';

	describe('Update LD Name', function() {

		afterEach(function(done) {
			Dao.insertOrUpdateRecord(resetLd, [ldOriginalName, ldOriginalLastEditDate, ldIdToEdit], function(err, result) {
				done();
			});
		});

		it('Updates name of existing LD', function(done) {
			var today = new Date();
			var ldName = 'Modified ' + ldOriginalName;
			LdEditDao.updateLdName(ldName, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].name).to.equal(ldName);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldName = 'Some new name';
			var ldIdNotFound = 9999;
			LdEditDao.updateLdName(ldName, ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].name).to.equal(ldOriginalName);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

		it('Name is sanitized', function(done) {
			var today = new Date();
			var ldName = '; drop table ld;';
			LdEditDao.updateLdName(ldName, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].name).to.equal(ldName);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

	});

	describe('Update LD Students Desription', function() {

		afterEach(function(done) {
			Dao.insertOrUpdateRecord(resetStudentsDescr, [ldOriginalStudentsDescr, ldOriginalLastEditDate, ldIdToEdit], function(err, result) {
				done();
			});
		});

		it('Updates Students Description for existing LD', function(done) {
			var today = new Date();
			var ldStudentsDescr = 'Modified ' + ldOriginalStudentsDescr;
			LdEditDao.updateLdStudentsDescr(ldStudentsDescr, ldIdToEdit, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].students_profile).to.equal(ldStudentsDescr);
					expect(results[0].last_edit_date).to.equalDate(today);
					done();
				})
			});
		});

		it('Does nothing if LD ID not found', function(done) {
			var ldStudentsDescr = 'Some new students description';
			var ldIdNotFound = 9999;
			LdEditDao.updateLdStudentsDescr(ldStudentsDescr, ldIdNotFound, function(err, result) {
				expect(err).to.be.null;
				expect(result).not.to.be.null;
				Dao.findAll(verifyLd, [ldIdToEdit], function(err, results) {
					expect(err).to.be.null;
					expect(results).not.to.be.null;
					expect(results).to.have.length(1);
					expect(results[0].students_profile).to.equal(ldOriginalStudentsDescr);
					expect(results[0].last_edit_date).to.equalDate(ldOriginalLastEditDate);
					done();
				})
			});
		});

	});

});