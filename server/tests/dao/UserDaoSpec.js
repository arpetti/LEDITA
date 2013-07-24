var expect = require('chai').expect
    , UserDao = require('../../dao/UserDao');

describe('User DAO', function() {    

    var emailToInsert = 'bugs.bunny@looney.com';

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
            done();
        });
    });

    it('Find existing user by id', function(done) {
        var userId = 3;
        UserDao.getUserById(userId, function(err, results){
            expect(results).to.have.length(1);
            expect(results[0].id).to.equal(userId);
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

});	