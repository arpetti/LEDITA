var expect = require('chai').expect
    , UserValidator = require('../../service/UserValidator')
    , messages = require('../../service/ValidationMessages');

describe('User Validator', function() {  

    it('Valid user gets no error messages', function() {
      var user = {
            firstname: "Mickey",
            surname: "Mouse"
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(0);
    });  

    it('Error message when first name is too short', function() {
      var user = {
            firstname: "M",
            surname: "Mouse"
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.FIRST_NAME_LENGTH);
    });  

    it('2 error messages when first and surnames are too short', function() {
      var user = {
            firstname: "M",
            surname: "M"
        };
        var errorMessages = UserValidator.validate(user);
        expect(errorMessages).to.have.length(2);
        expect(errorMessages[0]).to.equal(messages.FIRST_NAME_LENGTH);
        expect(errorMessages[1]).to.equal(messages.SURNAME_LENGTH);
    });  

});	