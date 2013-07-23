var expect = require('chai').expect
    , Dao = require('../../dao/Dao');

describe('DAO', function() {    

	it('Find all users returns results', function(done) {
        var queryString = 'select id, name, last_name, gender, email from user';
        var queryParams = [];
		Dao.findAll(queryString, queryParams, function(err, results){
			expect(results).to.have.length.above(4);
            done();
		});
    });

    it('Find user by email returns one result', function(done) {
        var queryString = 'select id, name, last_name, gender, email from user where email = ?';
        var queryParams = ['mario@email.it'];
        Dao.findAll(queryString, queryParams, function(err, results){
            expect(results).to.have.length(1);
            expect(results[0].name).to.equal('Mario');
            expect(results[0].last_name).to.equal('Rossi');
            expect(results[0].gender).to.equal('M');
            expect(results[0].email).to.equal('mario@email.it');
            done();
        });
    });

    it('Find learning designs by scope and ld_model_id returns one result', function(done) {
        var queryString = 'select name, scope, ld_model_id from ld where scope = ? and ld_model_id = ?';
        var queryParams = ['Lesson', 5];
        Dao.findAll(queryString, queryParams, function(err, results){
            expect(results).to.have.length(1);
            expect(results[0].name).to.equal('LD Demo 7');
            expect(results[0].scope).to.equal('Lesson');
            expect(results[0].ld_model_id).to.equal(5);
            done();
        });
    });

});	