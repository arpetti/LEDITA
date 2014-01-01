var expect = require('chai').expect;
var messages = require('../../../server/validate/ValidationMessages');
var fixture = require('../../../server/validate/UserProfileAvatarValidator');

describe('User Profile Avatar Validator', function() {

	it('Validates file exists', function() {
		var req = {files: {}};
		var result = fixture.validate(req);
		expect(result).to.have.length(1);
		expect(result[0]).to.equal(messages.USER_PROFILE_AVATAR_MISSING);
	});

	it('Validates file empty', function() {
		var req = {files: {
			userProfileImage: {
				size: 0,
				type: 'image/png'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(1);
		expect(result[0]).to.equal(messages.USER_PROFILE_AVATAR_EMPTY);
	});

	it('Validates mime type', function() {
		var req = {files: {
			userProfileImage: {
				size: 1024,
				type: 'text/plain'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(1);
		expect(result[0]).to.equal(messages.USER_PROFILE_AVATAR_INVALID_TYPE);
	});

	it('Validates max size', function() {
		var req = {files: {
			userProfileImage: {
				size: 500000,
				type: 'image/gif'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(1);
		expect(result[0]).to.equal(messages.USER_PROFILE_AVATAR_SIZE);
	});

	it('20K jpeg is valid', function() {
		var req = {files: {
			userProfileImage: {
				size: 20480,
				type: 'image/jpeg'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(0);
	});

	it('10K gif is valid', function() {
		var req = {files: {
			userProfileImage: {
				size: 10240,
				type: 'image/gif'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(0);
	});

	it('15K pjpeg is valid', function() {
		var req = {files: {
			userProfileImage: {
				size: 15360,
				type: 'image/pjpeg'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(0);
	});

	it('5K png is valid', function() {
		var req = {files: {
			userProfileImage: {
				size: 5120,
				type: 'image/png'
			}
		}};
		var result = fixture.validate(req);
		expect(result).to.have.length(0);
	});

});
