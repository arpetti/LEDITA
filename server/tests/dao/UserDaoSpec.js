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

    it('Looking for user that does not exist returns no rows', function(done) {
        var email = 'nonExistingUser@test.com';
		UserDao.getUserByEmail(email, function(err, results){
			expect(results).to.have.length(0);
            done();
		});
    });

    it('Insert a new user returns newly created user id', function(done) {
        var userData = {
            name: 'Bugs',
            last_name: 'Bunny',
            gender: 'M',
            email: emailToInsert,
            salt: 'saltNotNeeded',
            hash: 'hashedPasswordGobbledyGook&='

        };
        UserDao.addUser(userData, function(err, result) {
            expect(result).not.to.be.null;
            expect(result).to.be.above(5);
            done();
        });
    });

});	