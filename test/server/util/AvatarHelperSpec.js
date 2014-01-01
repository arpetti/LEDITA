var expect = require('chai').expect;
var sinon = require('sinon');
var assert = require('chai').assert;
var fixture = require('../../../server/util/AvatarHelper');
var uuid = require('node-uuid');

describe('Avatar Helper', function() {

	var sandbox = sinon.sandbox.create();

  beforeEach(function() {
  });

  afterEach(function() {
      sandbox.restore();
  });

	it('Builds Image Record', function() {
		var userProfileImage = {
			size: 14453,
			path: '/temp/path/foo',
			name: 'sample.gif',
			type: 'image/gif',
			mtime: '2013-12-31T20:34:46.872Z'
		};
		var imageDetails = {
			name: 'avatar-876-9aa544e1.gif',
			uri: 'avatar/avatar-876-9aa544e1.gif',
			sourcePath: '/temp/path/foo/bar',
			targetPath: '/server/path/to/user/upload/dir'
		};
		
		var result = fixture.buildImageRecord(imageDetails, userProfileImage);

		expect(result.name).to.equal(imageDetails.name);
		expect(result.size).to.equal(userProfileImage.size);
		expect(result.uri).to.equal(imageDetails.uri);
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
		var uuidResult = '9aa544e1';
		var uuidStub = sandbox.stub(uuid, 'v4').returns(uuidResult);
		
		var result = fixture.getImageDetails(userId, userProfileImage);
		assert.isTrue(uuidStub.calledOnce);

		expect(result.name).to.equal('avatar-876-9aa544e1.jpg');
		expect(result.uri).to.equal('avatar/avatar-876-9aa544e1.jpg');
		expect(result.sourcePath).to.equal(userProfileImage.path);
		expect(result.targetPath).to.contain('/../../user-upload/avatar/avatar-876-9aa544e1.jpg')
	});

});