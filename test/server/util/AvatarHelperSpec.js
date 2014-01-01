var expect = require('chai').expect;
var assert = require('chai').assert;
var fixture = require('../../../server/util/AvatarHelper');

describe('Avatar Helper', function() {

	it('Builds Image Name', function() {
		var userId = 23;
		var userProfileImage = {
			size: 14453,
			path: '/temp/path/foo',
			name: 'sample.jpg',
			type: 'image/jpeg',
			mtime: '2013-12-31T20:34:46.872Z'
		};
		var result = fixture.buildImageName(userId, userProfileImage);
		expect(result).to.equal('avatar-23.jpg')
	});

	it('Builds Image URI', function() {
		var userId = 23;
		var userProfileImage = {
			size: 14453,
			path: '/temp/path/foo',
			name: 'sample.png',
			type: 'image/png',
			mtime: '2013-12-31T20:34:46.872Z'
		};
		var result = fixture.buildImageUri(userId, userProfileImage);
		expect(result).to.equal('avatar/avatar-23.png');
	});

	it('Builds Image Target Path', function() {
		var userId = 23;
		var userProfileImage = {
			size: 14453,
			path: '/temp/path/foo',
			name: 'sample.png',
			type: 'image/png',
			mtime: '2013-12-31T20:34:46.872Z'
		};
		var result = fixture.buildImageTargetPath(userId, userProfileImage);
		expect(result).to.contain('/../../user-upload/avatar/avatar-23.png');
	});

	it('Builds Image Record', function() {
		var userId = 123456;
		var userProfileImage = {
			size: 14453,
			path: '/temp/path/foo',
			name: 'sample.gif',
			type: 'image/gif',
			mtime: '2013-12-31T20:34:46.872Z'
		};
		var result = fixture.buildImageRecord(userId, userProfileImage);
		expect(result.name).to.equal('avatar-123456.gif');
		expect(result.size).to.equal(userProfileImage.size);
		expect(result.uri).to.equal('avatar/avatar-123456.gif');
		expect(result.mime).to.equal(userProfileImage.type);
	});

	it('Gets Image Details', function() {
		var userId = 876;
		var userProfileImage = {
			size: 9453,
			path: '/temp/path/foo/bar',
			name: 'sample.jpg',
			type: 'image/pjpeg',
			mtime: '2013-12-31T20:34:46.872Z'
		};
		
		var result = fixture.getImageDetails(userId, userProfileImage);
		expect(result.name).to.equal('avatar-876.jpg');
		expect(result.uri).to.equal('avatar/avatar-876.jpg');
		expect(result.sourcePath).to.equal(userProfileImage.path);
		expect(result.targetPath).to.contain('/../../user-upload/avatar/avatar-876.jpg')
	});

});