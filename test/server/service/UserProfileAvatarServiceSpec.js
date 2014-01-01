var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/service/UserProfileAvatarService');

describe('User Profile Avatar Service', function() {

	it('Builds Image URI', function() {
		var userId = 23;
		var userProfileImage = {
			size: 14453,
			path: '/temp/path/foo',
			name: 'sample.png',
			type: 'image/png',
			mtime: '2013-12-31T20:34:46.872Z'
		}
		var result = fixture.buildImageUri(userId, userProfileImage);
		expect(result).to.equal('avatar/avatar-23.png');
	});

	it('Builds Image Path', function() {
		var imageUri = 'avatar/avatar-23.png';
		var result = fixture.buildImagePath(imageUri);
		expect(result).to.contain('/../../user-upload/avatar/avatar-23.png');
	});

});