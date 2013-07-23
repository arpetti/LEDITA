var expect = require('chai').expect
    , UserDao = require('../../dao/UserDao');

describe('User DAO', function() {    

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

});	