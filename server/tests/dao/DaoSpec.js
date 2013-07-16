var expect = require('chai').expect
    , Dao = require('../../dao/Dao');

describe('DAO', function() {    

	it('Find all returns results for any query', function(done) {
        var queryString = 'select id, name, last_name, gender, email from user';
		Dao.findAll(queryString, function(err, results){
			expect(results).to.have.length(5);
            done();
		});
    });

});	