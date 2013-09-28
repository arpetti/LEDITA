var expect = require('chai').expect
    , CsrfHelper = require('../../../server/util/CsrfHelper');

describe('Csrf Helper', function() { 

	var req = { };
	var res = { };
	var next = { };

	describe('csrfValue', function() {

		it('gets the token from request header x-xsrf-token', function() {
			var tokenValue = 'abcdefg12345678';
			req.headers = {'x-xsrf-token' : tokenValue};

			var actualTokenValue = CsrfHelper.csrfValue(req);
			expect(actualTokenValue).to.equal(tokenValue);
		});

		it('gets the token from request header x-csrf-token', function() {
			var tokenValue = 'abcdefg12345678';
			req.headers = {'x-csrf-token' : tokenValue};

			var actualTokenValue = CsrfHelper.csrfValue(req);
			expect(actualTokenValue).to.equal(tokenValue);
		});

		it('x-csrf-token takes precedence over x-xsrf-token', function() {
			var csrfTokenValue = 'abcdefg12345678';
			var xsrfTokenValue = 'zzzzzzz99999999';
			req.headers = {
				'x-csrf-token' : csrfTokenValue, 
				'x-xsrf-token' : xsrfTokenValue
			};

			var actualTokenValue = CsrfHelper.csrfValue(req);
			expect(actualTokenValue).to.equal(csrfTokenValue);
		});

	});

});