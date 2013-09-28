// This is an integration test because the dependencies are not mocked out

var expect = require('chai').expect
    , UserValidator = require('../../../server/service/UserValidator')
    , messages = require('../../../server/service/ValidationMessages');

describe('User Validator Integration', function() {  

	it('Validate user exists calls back with message when user exists', function(done) {
        var email = 'sara@email.it';
        UserValidator.validateExists(email, function(err, message){
            expect(err).to.be.null;
            expect(message).to.equal(messages.USERNAME_EXISTS);
            done();
        });
    });

    it('Validate user exists calls back with null when user does not exists', function(done) {
        var email = 'nobody.here@test.com';
        UserValidator.validateExists(email, function(err, message){
            expect(err).to.be.null;
            expect(message).to.be.null;
            done();
        });
    });

});