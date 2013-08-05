var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , AuthCtrl = require('../../controllers/auth')
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
                done();
            };

            AuthCtrl.registerNewUser(req, res, next);

        });

        it('returns a 400 when user validation fails', function(done) {
            
            var errorMessages = ["some error"];
            var userValidateStub = sandbox.stub(UserValidator, "validate").returns(errorMessages);
            
            var userValidateExistsStub = sandbox.stub(UserValidator, "validateExists");
            var hashHelperStub = sandbox.stub(HashHelper, "generateHash");
            var userServiceStub = sandbox.stub(UserService, "addNewUser");

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(400);
                assert.isTrue(userValidateStub.calledOnce);
                assert.equal(userValidateExistsStub.callCount, 0, "user exists check is not called when there are validation errors");
                assert.equal(hashHelperStub.callCount, 0, "password hash is not generated when there are validation errors");
                assert.equal(userServiceStub.callCount, 0, "user is not added when there are validation errors");
                done();
            };

            AuthCtrl.registerNewUser(req, res, next);
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
                assert.isTrue(userValidateStub.calledOnce);
                assert.isTrue(userValidateExistsStub.calledOnce);
                assert.equal(hashHelperStub.callCount, 0, "password hash is not generated when user already exists");
                assert.equal(userServiceStub.callCount, 0, "user is not added when user already exists");
                done();
            };

            AuthCtrl.registerNewUser(req, res, next);
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
                assert.isTrue(userValidateStub.calledOnce);
                assert.isTrue(userValidateExistsStub.calledOnce);
                assert.equal(hashHelperStub.callCount, 0, "password hash is not generated when error occurs checking if user exists");
                assert.equal(userServiceStub.callCount, 0, "user is not added when error occurs checking if user exists");
                done();
            };

            AuthCtrl.registerNewUser(req, res, next);
        });

    });

    describe('register()', function() {

        beforeEach(function() {
            req.body = {
                username: "user",
                password: "pass",
                role: 1
            };
        });

        it('should return a 400 when user validation fails', function(done) {

            var userValidateStub = sandbox.stub(User, 'validate').throws();
            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(400);
                done();
            };

            AuthCtrl.register(req, res, next);
        });

        it('should return a 403 when UserAlreadyExists error is returned from User.addUser()', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(username, password, role, callback) {
                callback('UserAlreadyExists');
            });

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(403);
                done();
            };

            AuthCtrl.register(req, res, next);
        });

        it('should return a 500 if error other than UserAlreadyExists is returned from User.addUser()', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(username, password, role, callback) {
                callback('SomeError');
            });

            res.send = function(httpStatus) {
                expect(httpStatus).to.equal(500);
                done();
            };

            AuthCtrl.register(req, res, next);
        });

        it('should call next() with an error argument if req.logIn() returns error', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(username, password, role, callback) {
                callback(null, req.body);
            });
            req.logIn = function(user, callback) { return callback('SomeError'); };

            next = function(err) {
                expect(err).to.exist;
                done();
            };

            AuthCtrl.register(req, res, next);
        });

        it('should return a 200 with a username and role in the response body', function(done) {
            var userValidateStub = sandbox.stub(User, 'validate').returns();
            var userAddUserStub = sandbox.stub(User, 'addUser', function(username, password, role, callback) {
                callback(null, req.body);
            });
            req.logIn = function(user, callback) { return callback(null); };

            res.json = function(httpStatus, user) {
                expect(httpStatus).to.equal(200);
                expect(user.username).to.exist;
                expect(user.role).to.exist;
                done();
            };

            AuthCtrl.register(req, res, next);
        });
    });
});