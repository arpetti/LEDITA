var expect = require('chai').expect
var RefDao = require('../../dao/RefDao');

describe('Reference Data Dao', function() {

	it('Gets all qcers', function(done) {
		RefDao.getQcers(function(err, results) {
			expect(err).to.be.null;
			expect(results).to.have.length(6);
			expect(results[0].name).to.equal('A1');
			expect(results[1].name).to.equal('A2');
			expect(results[2].name).to.equal('B1');
			expect(results[3].name).to.equal('B2');
			expect(results[4].name).to.equal('C1');
			expect(results[5].name).to.equal('C2');
			done();
		});
	});

});