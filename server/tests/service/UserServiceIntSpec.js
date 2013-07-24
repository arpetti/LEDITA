// This is an integration test because the dependencies are not mocked out

var expect = require('chai').expect
    , UserService = require('../../service/UserService');

describe('User Service Integration', function() {    

	it('User that provides correct password can successfully authenticate', function(done) {
        var username = 'sara@email.it';
        var password = 'passw0rD';
        UserService.authenticateUser(username, password, function(err, user, info){
            
            // Verify no errors
            expect(err).to.be.null;
            expect(info).to.be.null;
            expect(user).not.to.be.null;
            
            // Verify returned user
            expect(user.id).not.to.be.null;
            expect(user.name).to.equal('Sara');
            expect(user.last_name).to.equal('Neri');
            expect(user.gender).to.equal('F');
            expect(user.email).to.equal(username);
            expect(user.hash).to.be.null;
            expect(user.role).not.to.be.null;
            done();
        });
    });

});	