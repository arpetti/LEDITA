var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , UserService = require('../../service/UserService')
    , UserDao = require('../../dao/UserDao');

describe('User Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('Authenticate User', function() {

    	it('Calls back with error if unexpected error occurs getting user by email', function(done) {

    		var userEmailError = new Error("something went wrong");
    		var userDaoStub = sandbox.stub(UserDao, "getUserByEmail", function(email, callback) {
                callback(userEmailError);
            });

    		var username = 'jane.doe@test.com';
    		var password = 'janespassword';
    		
    		var authCallback = function(err, user, info) {
    			expect(err).to.equal(userEmailError);
    			assert.isTrue(userDaoStub.withArgs(username).calledOnce);
    			done();
    		}
            
            UserService.authenticateUser(username, password, authCallback)

    	});

    });

});    