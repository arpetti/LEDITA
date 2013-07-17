var expect = require('chai').expect
    , HashHelper = require('../../util/HashHelper');

describe('Hash Helper', function() { 

    var password = 'MyL#ttleP0ny';
    var wrongPassword = 'MyL#ttlePony';

	it('Hashes a password', function(done) {
        HashHelper.generateHash(password, function(err, result) {
            expect(err).to.be.null;
            expect(result).to.have.length.above(30);
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