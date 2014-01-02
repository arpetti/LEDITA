var expect = require('chai').expect
    , UserDao = require('../../../server/dao/UserDao');

describe('User DAO', function() {    

    var emailToInsert = 'bugs.bunny@looney.com';
    var emailExists = 'mario@email.it';

    afterEach(function(done) {
        UserDao.deleteUser({email: emailToInsert}, function(err, result) {
            done();
        });
    });

	it('Find existing user by email', function(done) {
        var email = 'sara@email.it';
        UserDao.getUserByEmail(email, function(err, results){
            expect(results).to.have.length(1);
            expect(results[0].email).to.equal(email);
            expect(results[0].hash).to.have.length(60);
            expect(results[0].image_uri).to.equal('avatar/user4.png'); // known from demo data
            done();
        });
    });

    it('Find existing user by id', function(done) {
        var userId = 3;
        UserDao.getUserById(userId, function(err, results){
            expect(results).to.have.length(1);
            expect(results[0].id).to.equal(userId);
            expect(results[0].image_uri).not.to.be.null;
            expect(results[0].email).to.equal('antonio@email.it');
            expect(results[0].name).to.equal('Antonio');
            expect(results[0].last_name).to.equal('Verdi');
            done();
        });
    });

    it('Looking for user by email that does not exist returns no rows', function(done) {
        var email = 'nonExistingUser@test.com';
		UserDao.getUserByEmail(email, function(err, results){
			expect(results).to.have.length(0);
            done();
		});
    });

    it('Looking for user by id that does not exist returns no rows', function(done) {
        var userId = 999;
        UserDao.getUserById(userId, function(err, results){
            expect(results).not.to.be.null;
            expect(results).to.have.length(0);
            done();
        });
    });

    it('Insert a new user returns newly created user id', function(done) {
        var userData = {
            name: 'Bugs',
            last_name: 'Bunny',
            email: emailToInsert,
            hash: 'hashedPasswordGobbledyGook&='

        };
        UserDao.addUser(userData, function(err, result) {
            expect(result).not.to.be.null;
            expect(result).to.be.above(5);
            done();
        });
    });

    it('Insert user with email that already exists returns error', function(done) {
        var userData = {
            name: 'Bugs',
            last_name: 'Bunny',
            email: emailExists,
            hash: 'hashedPasswordGobbledyGook&='
        };
        UserDao.addUser(userData, function(err, result) {
            expect(err).not.to.be.null;
            expect(err.message).to.contain('UNIQ_EMAIL');
            expect(result).to.be.undefined;
            done();
        });
    });

});	