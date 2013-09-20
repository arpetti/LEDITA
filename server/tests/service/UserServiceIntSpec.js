// This is an integration test because the dependencies are not mocked out

var expect = require('chai').expect
    , UserService = require('../../service/UserService')
    , UserDao = require('../../dao/UserDao')
    , messages = require('../../service/ValidationMessages');

describe('User Service Integration', function() {    

    var goodUsername = 'sara@email.it';
    var goodPassword = 'passw0rD';
    
    var badUsername = 'nosuchuser@email.it';
    var badPassword = 'passworD';

    var validUserId = 3;
    var invalidUserId = 999;

    var emailToInsert = 'daffy.duck@looney.com';

    afterEach(function(done) {
        UserDao.deleteUser({email: emailToInsert}, function(err, result) {
            done();
        });
    });
    
	it('User that provides correct password can successfully authenticate', function(done) {
        UserService.authenticateUser(goodUsername, goodPassword, function(err, user, info){
            
            // Verify no errors
            expect(err).to.be.null;
            expect(info.message).to.equal(messages.LOGIN_SUCCESS);
            expect(user).not.to.be.null;
            
            // Verify returned user
            expect(user.id).not.to.be.null;
            expect(user.name).to.equal('Sara');
            expect(user.last_name).to.equal('Neri');
            expect(user.email).to.equal(goodUsername);
            expect(user.username).to.equal(goodUsername);
            expect(user.hash).to.be.null;
            expect(user.role).not.to.be.null;
            done();
        });
    });

    it('User that provides wrong password fails authentication', function(done) {
    	UserService.authenticateUser(goodUsername, badPassword, function(err, user, info){
            expect(user).to.be.null;
            expect(err).to.be.null;
            expect(info).not.to.be.null;
            expect(info.message).to.be.equal(messages.INVALID_USERNAME_PASSWORD);
            done();
        });
    });

    it('User that provides invalid username fails authentication', function(done) {
        UserService.authenticateUser(badUsername, goodPassword, function(err, user, info){
            expect(user).to.be.null;
            expect(err).to.be.null;
            expect(info).not.to.be.null;
            expect(info.message).to.be.equal(messages.INVALID_USERNAME_PASSWORD);
            done();
        });
    });

    it('Find user by id for valid id returns a result', function(done) {
        UserService.findUserById(validUserId, function(user){
            expect(user).not.to.be.null;
            expect(user.id).to.be.equal(validUserId);
            done();
        });
    });

    it('Find user by id for invalid id returns null', function(done) {
        UserService.findUserById(invalidUserId, function(user){
            expect(user).to.be.null;
            done();
        });
    });

    it('Add new user returns newly added user object', function(done) {
        var hash = "quackquackhashedpassword";
        var userIn = {
            username: emailToInsert,
            firstname: "Daffy",
            surname: "Duck"
        };
    	UserService.addNewUser(userIn, hash, function(err, userOut){
            expect(err).to.be.null;
            expect(userOut).not.to.be.null;
            expect(userOut.id).to.be.above(5);
            expect(userOut.email).to.equal(userIn.username);
            expect(userOut.name).to.equal(userIn.firstname);
            expect(userOut.last_name).to.equal(userIn.surname);
            done();
        });
    });

});	