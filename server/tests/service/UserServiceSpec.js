var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , UserService = require('../../service/UserService')
    , UserDao = require('../../dao/UserDao')
    , HashHelper = require('../../util/HashHelper')
    , messages = require('../../service/ValidationMessages');

describe('User Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('Add new user', function() {

        it('Returns newly added user object when successful', function(done) {

            var hash = "jamespasswordhash";
            var userToBeAdded = {firstname: "James", surname: "Jones", username: "james.jones@test.com", hash: hash};

            var addedUserId = 65;
            var userDaoAddUserStub = sandbox.stub(UserDao, "addUser", function(userJsonData, callback) {
                callback(null, addedUserId);
            })

            var userResults = [{id: addedUserId, name: "James", last_name: "Jones", email: "james.jones@test.com"}];
            var userDaoGetUserStub = sandbox.stub(UserDao, "getUserById", function(id, callback) {
                callback(null, userResults);
            });

            var userMatcher = sinon.match({
                name: userToBeAdded.firstname,
                last_name: userToBeAdded.surname,
                email: userToBeAdded.username,
                hash: hash
            });

            var addUserCallback = function(err, user) {
                expect(err).to.be.null;
                expect(user.id).to.equal(userResults[0].id);
                expect(user.name).to.equal(userResults[0].name);
                expect(user.last_name).to.equal(userResults[0].last_name);
                expect(user.email).to.equal(userResults[0].email);
                expect(user.username).to.equal(user.email);

                assert.isTrue(userDaoAddUserStub.withArgs(userMatcher).calledOnce);
                assert.isTrue(userDaoGetUserStub.withArgs(addedUserId).calledOnce);
                done();
            };

            UserService.addNewUser(userToBeAdded, hash, addUserCallback);
        });

    });

    describe('Find user by id', function() {

        it('Calls back with null if unexpected error occurs retrieving user from dao', function(done) {

            var userId = 78;

            var userDaoStub = sandbox.stub(UserDao, "getUserById", function(id, callback) {
                callback(new Error("something went wrong"));
            });

            var findUserCallback = function(user) {
                expect(user).to.be.null;
                assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
                done();
            }

            UserService.findUserById(userId, findUserCallback);
        });

        it('Calls back with null if user not found by id', function(done) {

            var userId = 78;

            var userDaoStub = sandbox.stub(UserDao, "getUserById", function(id, callback) {
                callback(null, []);
            });

            var findUserCallback = function(user) {
                expect(user).to.be.null;
                assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
                done();
            }

            UserService.findUserById(userId, findUserCallback);
        });

        it('Calls back with user object when user found by id', function(done) {

            var userId = 78;
            
            var userResults = [{id: userId, name: "James", last_name: "Jones", email: "james.jones@test.com"}];
            var userDaoStub = sandbox.stub(UserDao, "getUserById", function(id, callback) {
                callback(null, userResults);
            });

            var findUserCallback = function(user) {
                expect(user).not.to.be.null;
                expect(user.username).to.equal(userResults[0].email);
                assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
                done();
            }

            UserService.findUserById(userId, findUserCallback);
        });

    });

    describe('Authenticate User', function() {

    	it('Calls back with error if unexpected error occurs getting user by email', function(done) {

    		var userEmailError = new Error("something went wrong");
    		var userDaoStub = sandbox.stub(UserDao, "getUserByEmail", function(email, callback) {
                callback(userEmailError);
            });

            var hashHelperStub = sandbox.stub(HashHelper, "compareHash");

    		var username = 'jane.doe@test.com';
    		var password = 'janespassword';
    		
    		var authCallback = function(err, user, info) {
    			expect(err).to.equal(userEmailError);
    			expect(user).to.be.null;
    			expect(info.message).to.equal(messages.UNABLE_TO_RETRIEVE_USER);

    			assert.isTrue(userDaoStub.withArgs(username).calledOnce);
    			assert.equal(hashHelperStub.callCount, 0, "does not check password if could not find user");
    			done();
    		}
            
            UserService.authenticateUser(username, password, authCallback);
    	});

    	it('Calls back with message if user cannot be found by email', function(done) {

    		var userResults = [];
    		var userDaoStub = sandbox.stub(UserDao, "getUserByEmail", function(email, callback) {
                callback(null, userResults);
            });

            var hashHelperStub = sandbox.stub(HashHelper, "compareHash");

    		var username = 'jane.doe@test.com';
    		var password = 'janespassword';
    		
    		var authCallback = function(err, user, info) {
    			expect(err).to.be.null;
    			expect(user).to.be.null;
    			expect(info.message).to.equal(messages.INVALID_USERNAME_PASSWORD);

    			assert.isTrue(userDaoStub.withArgs(username).calledOnce);
    			assert.equal(hashHelperStub.callCount, 0, "does not check password if could not find user");
    			done();
    		}
            
            UserService.authenticateUser(username, password, authCallback);
    	});

        it('Calls back with error if unexpected error occurs checking password', function(done) {

            var username = 'jane.doe@test.com';
            var password = 'janespassword';
            var passwordHash = 'password$hash$gobbledy$gook';

            var userResults = [{id: 111, name: "Jane", last_name: "Doe", email: username, hash: passwordHash}];
            var userDaoStub = sandbox.stub(UserDao, "getUserByEmail", function(email, callback) {
                callback(null, userResults);
            });

            var hashError = new Error("something went wrong");
            var hashHelperStub = sandbox.stub(HashHelper, "compareHash", function(password, hash, callback) {
                callback(hashError);
            });

            
            var authCallback = function(err, user, info) {
                expect(err).to.equal(hashError);
                expect(user).to.be.null;
                expect(info.message).to.equal(messages.UNABLE_TO_RETRIEVE_USER);

                assert.isTrue(userDaoStub.withArgs(username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(password, passwordHash).calledOnce);
                done();
            }
            
            UserService.authenticateUser(username, password, authCallback);
        });

        it('Calls back with message if provided password does not match saved password', function(done) {

            var username = 'jane.doe@test.com';
            var password = 'janespassword';
            var passwordHash = 'password$hash$gobbledy$gook';

            var userResults = [{id: 111, name: "Jane", last_name: "Doe", email: username, hash: passwordHash}];
            var userDaoStub = sandbox.stub(UserDao, "getUserByEmail", function(email, callback) {
                callback(null, userResults);
            });

            var hashHelperStub = sandbox.stub(HashHelper, "compareHash", function(password, hash, callback) {
                callback(null, false);
            });

            
            var authCallback = function(err, user, info) {
                expect(err).to.be.null;
                expect(user).to.be.null;
                expect(info.message).to.equal(messages.INVALID_USERNAME_PASSWORD);

                assert.isTrue(userDaoStub.withArgs(username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(password, passwordHash).calledOnce);
                done();
            }
            
            UserService.authenticateUser(username, password, authCallback);
        });

        it('Calls back with user object when authentication succeeds', function(done) {

            var username = 'jane.doe@test.com';
            var password = 'janespassword';
            var passwordHash = 'password$hash$gobbledy$gook';

            var userResults = [{id: 111, name: "Jane", last_name: "Doe", email: username, hash: passwordHash}];
            var userDaoStub = sandbox.stub(UserDao, "getUserByEmail", function(email, callback) {
                callback(null, userResults);
            });

            var hashHelperStub = sandbox.stub(HashHelper, "compareHash", function(password, hash, callback) {
                callback(null, true);
            });

            
            var authCallback = function(err, user, info) {
                expect(err).to.be.null;
                expect(user).not.to.be.null;
                expect(user.username).to.equal(userResults[0].email);
                expect(info.message).to.equal(messages.LOGIN_SUCCESS);

                assert.isTrue(userDaoStub.withArgs(username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(password, passwordHash).calledOnce);
                done();
            }
            
            UserService.authenticateUser(username, password, authCallback);
        });

    });

});    