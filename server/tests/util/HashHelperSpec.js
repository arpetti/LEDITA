var expect = require('chai').expect
    , HashHelper = require('../../util/HashHelper');

describe('Hash Helper', function() { 

    var password = 'passw0rD';
    var wrongPassword = 'passworD';
    var longPassword = 'ThisIsMySuperDuperLongPasswordButEasyToRemember';

	it('Hashes a password', function(done) {
        HashHelper.generateHash(password, function(err, result) {
            expect(err).to.be.null;
            expect(result.length).to.equal(60);
            done();
        });
    });

    it('Hashed password length is same size regardless of input size', function(done) {
        HashHelper.generateHash(longPassword, function(err, result) {
            expect(err).to.be.null;
            expect(result.length).to.equal(60);
            done();
        });
    });
    
    it('Hashes and compares password success', function(done) {
        HashHelper.generateHash(password, function(err, result) {
            HashHelper.compareHash(password, result, function(err, compareResult) {
                expect(err).to.be.null;
                expect(compareResult).to.be.true;
                done();
            });
        });
    });
    
    it('Hashes and compares password failure', function(done) {
		HashHelper.generateHash(password, function(err, result) {
            HashHelper.compareHash(wrongPassword, result, function(err, compareResult) {
                expect(err).to.be.null;
                expect(compareResult).to.be.false;
                done();
            });
		});
    });


});	