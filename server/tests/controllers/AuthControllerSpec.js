var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , AuthController = require('../../controllers/AuthController')
    , User = require('../../models/User')
    , UserValidator = require('../../service/UserValidator')
    , HashHelper = require('../../util/HashHelper')
    , UserService = require('../../service/UserService');

describe('Auth controller', function() {

    var req = { }
        , res = {}
        , next = {}
        , sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('registerNewUser', function() {

        beforeEach(function() {
            req.body = {
                firstname: "John",
                surname: "Smith",
                username: "john.smith@test.com",
                password: "12345678",
                terms: true,
                role: {bitMask: 2, title: "user"}
            };
        });

        it('returns a 200 when user registration is successful', function(done) {
            
            var errorMessages = [];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);

            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists", function(username, callback) {
                callback(null, null);
            });
            
            var hashedPassword = "its-a-hash";
            var hashHelperStub = sandbox.stub(HashHelper, "generateHash", function(password, callback) {
                callback(null, hashedPassword);
            });

            var addedUser = {
                id: 999,
                name: "John",
                last_name: "Smith",
                email: "john.smith@test.com",
                role: {"bitMask":2,"title":"user"},
                username: "john.smith@test.com"
            };
            var userServiceStub = sandbox.stub(UserService, "addNewUser", function(user, hash, callback) {
                callback(null, addedUser);
            });

            req.logIn = function(user, callback) { return callback(null); };

            res.json = function(httpStatus, user) {
                expect(httpStatus).to.equal(200);
                expect(user.username).to.equal(addedUser.username);
                expect(user.role).to.exist;
                
                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.isTrue(userValidateExistsStub.withArgs(req.body.username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(req.body.password).calledOnce);
                assert.isTrue(userServiceStub.withArgs(req.body).calledOnce);
                done();
            };

            AuthController.registerNewUser(req, res, next);

        });

        it('returns a 400 when user validation fails', function(done) {
            
            var errorMessages = ["some error"];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);
            
            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists");
            var hashHelperStub = sandbox.stub(HashHelper, "generateHash");
            var userServiceStub = sandbox.stub(UserService, "addNewUser");

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(400);
                
                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.equal(userValidateExistsStub.callCount, 0, "user exists check is not called when there are validation errors");
                assert.equal(hashHelperStub.callCount, 0, "password hash is not generated when there are validation errors");
                assert.equal(userServiceStub.callCount, 0, "user is not added when there are validation errors");
                done();
            };

            AuthController.registerNewUser(req, res, next);
        });

        it('returns a 403 when user already exists', function(done) {
            
            var errorMessages = [];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);
            
            var userExistsMessage = "user already exists"
            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists", function(username, callback) {
                callback(null, userExistsMessage);
            });

            var hashHelperStub = sandbox.stub(HashHelper, "generateHash");
            var userServiceStub = sandbox.stub(UserService, "addNewUser");

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(403);
                expect(message).to.equal(userExistsMessage);
                
                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.isTrue(userValidateExistsStub.withArgs(req.body.username).calledOnce);
                assert.equal(hashHelperStub.callCount, 0, "password hash is not generated when user already exists");
                assert.equal(userServiceStub.callCount, 0, "user is not added when user already exists");
                done();
            };

            AuthController.registerNewUser(req, res, next);
        });

        it('returns a 500 when checking for existing user encounters unexpected error', function(done) {

            var errorMessages = [];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);

            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists", function(username, callback) {
                callback(new Error("something went wrong"));
            });

            var hashHelperStub = sandbox.stub(HashHelper, "generateHash");
            var userServiceStub = sandbox.stub(UserService, "addNewUser");

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(500);
                
                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.isTrue(userValidateExistsStub.withArgs(req.body.username).calledOnce);
                assert.equal(hashHelperStub.callCount, 0, "password hash is not generated when error occurs checking if user exists");
                assert.equal(userServiceStub.callCount, 0, "user is not added when error occurs checking if user exists");
                done();
            };

            AuthController.registerNewUser(req, res, next);
        });

        it('returns a 500 when password hash generation encounters unexpected error', function(done) {

            var errorMessages = [];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);

            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists", function(username, callback) {
                callback(null, null);
            });

            var hashHelperStub = sandbox.stub(HashHelper, "generateHash", function(password, callback) {
                callback(new Error("something went wrong"));
            });
            
            var userServiceStub = sandbox.stub(UserService, "addNewUser");

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(500);
                
                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.isTrue(userValidateExistsStub.withArgs(req.body.username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(req.body.password).calledOnce);
                assert.equal(userServiceStub.callCount, 0, "user is not added when error occurs generating password hash");
                done();
            };

            AuthController.registerNewUser(req, res, next);
        });

        it('returns a 500 when adding a new user encounters unexpected error', function(done) {

            var errorMessages = [];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);

            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists", function(username, callback) {
                callback(null, null);
            });

            var hashedPassword = "its-a-hash";
            var hashHelperStub = sandbox.stub(HashHelper, "generateHash", function(password, callback) {
                callback(null, hashedPassword);
            });
            
            var userServiceStub = sandbox.stub(UserService, "addNewUser", function(user, hash, callback) {
                callback(new Error("something went wrong"));
            });

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(500);
                
                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.isTrue(userValidateExistsStub.withArgs(req.body.username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(req.body.password).calledOnce);
                assert.isTrue(userServiceStub.withArgs(req.body).calledOnce);
                done();
            };

            AuthController.registerNewUser(req, res, next);
        });

        it('calls next() with an error argument if req.logIn() returns error', function(done) {

            var errorMessages = [];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);

            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists", function(username, callback) {
                callback(null, null);
            });
            
            var hashedPassword = "its-a-hash";
            var hashHelperStub = sandbox.stub(HashHelper, "generateHash", function(password, callback) {
                callback(null, hashedPassword);
            });

            var addedUser = {
                id: 999,
                name: "John",
                last_name: "Smith",
                email: "john.smith@test.com",
                role: {"bitMask":2,"title":"user"},
                username: "john.smith@test.com"
            };
            var userServiceStub = sandbox.stub(UserService, "addNewUser", function(user, hash, callback) {
                callback(null, addedUser);
            });

            req.logIn = function(user, callback) { return callback('SomeError'); };

            next = function(err) {
                expect(err).to.exist;

                assert.isTrue(userValidateStub.withArgs(req.body).calledOnce);
                assert.isTrue(userValidateExistsStub.withArgs(req.body.username).calledOnce);
                assert.isTrue(hashHelperStub.withArgs(req.body.password).calledOnce);
                assert.isTrue(userServiceStub.withArgs(req.body).calledOnce);
                done();
            };

            AuthController.registerNewUser(req, res, next);

        });

    });

});