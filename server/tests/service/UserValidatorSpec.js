var expect = require('chai').expect
    , UserValidator = require('../../service/UserValidator')
    , messages = require('../../service/ValidationMessages');

describe('User Validator', function() {  

    it('Valid user gets no error messages', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(0);
    });  

    it('Error messages when first name is null', function() {
        var user = {
            firstname: null,
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(3);
        expect(errorMessages[0]).to.equal(messages.FIRST_NAME_REQUIRED);
        expect(errorMessages[1]).to.equal(messages.FIRST_NAME_LENGTH);
        expect(errorMessages[2]).to.equal(messages.FIRST_NAME_ALLOWED_CHARS);
    }); 

    it('Error messages when first name is empty', function() {
        var user = {
            firstname: "     ",
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(2);
        expect(errorMessages[0]).to.equal(messages.FIRST_NAME_REQUIRED);
        expect(errorMessages[1]).to.equal(messages.FIRST_NAME_ALLOWED_CHARS);
    }); 

    it('Error message when first name is too short', function() {
        var user = {
            firstname: "M",
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.FIRST_NAME_LENGTH);
    });  

    it('Error messages when first and surnames are too short', function() {
        var user = {
            firstname: "M",
            surname: "M",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(2);
        expect(errorMessages[0]).to.equal(messages.FIRST_NAME_LENGTH);
        expect(errorMessages[1]).to.equal(messages.SURNAME_LENGTH);
    }); 

    it('Error message when surname contains numbers', function() {
        var user = {
            firstname: "Mickey",
            surname: "M0use123",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };
        
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.SURNAME_ALLOWED_CHARS);
    });  

    it('Error message when email is not provided', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            username: "",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(3);
        expect(errorMessages[0]).to.equal(messages.EMAIL_REQUIRED);
        expect(errorMessages[1]).to.equal(messages.EMAIL_LENGTH);
        expect(errorMessages[2]).to.equal(messages.EMAIL_FORMAT);
    });  

    it('Error message when email is too long', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };

        var tempArray = [];
        for (var i=0; i<150; i++) {
            tempArray.push('a');
        };
        var tempString = tempArray.join("");
        user.username = tempString + "." + tempString + "@test.com";

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.EMAIL_LENGTH);
    });  

    it('Error message when email is invalid format', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            username: "mickey_dot_mouse_at_disney_dot_com",
            password: "12345678",
            retypepassword: "12345678",
            terms: true
        };

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.EMAIL_FORMAT);
    });  

    it('Error message when password is not provided', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: " ",
            retypepassword: " ",
            terms: true
        };

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(2);
        expect(errorMessages[0]).to.equal(messages.PASSWORD_REQUIRED);
        expect(errorMessages[1]).to.equal(messages.PASSWORD_LENGTH);
    }); 

    it('Error message when password is too short', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: "1234567",
            retypepassword: "1234567",
            terms: true
        };

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.PASSWORD_LENGTH);
    }); 

    it('Error message when terms not accepted', function() {
        var user = {
            firstname: "Mickey",
            surname: "Mouse",
            username: "mickey.mouse@disney.com",
            password: "12345678",
            retypepassword: "12345678",
            terms: false
        };

        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.TERMS);
    }); 

});	