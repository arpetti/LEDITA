var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fs = require('fs');
var avatarHelper = require('../../../server/util/AvatarHelper');
var imageDao = require('../../../server/dao/ImageDao');
var userProfileEditDao = require('../../../server/dao/UserProfileEditDao');
var fixture = require('../../../server/service/UserProfileAvatarService');

describe('User Profile Avatar Service', function() {

	describe('Update Avatar', function() {

		var sandbox = sinon.sandbox.create();

		beforeEach(function() {
		});

		afterEach(function() {
		    sandbox.restore();
		});

		it('Calls back with image uri when successful', function(done) {

			var userId = 45;
			var userProfileImage = {
				size: 14453,
				path: '/temp/path/foo',
				name: 'sample.jpg',
				type: 'image/jpeg',
				mtime: '2013-12-31T20:34:46.872Z'
			};
			
			var imgDetails = {
				name: 'avatar-45.jpg',
				uri: 'avatar/avatar-45.jpg',
				sourcePath: '/temp/path/foo',
				targetPath: '/path/to/server/user/upload/dir'
			};
			var avatarHelperDetailsStub = sandbox.stub(avatarHelper, 'getImageDetails').returns(imgDetails);
			
			var fsStub = sandbox.stub(fs, 'rename', function(oldPath, newPath, cb) {
  			cb();
  		});

  		var imgRecord = {
  			name: 'avatar-45.jpg',
  			size: 14453,
  			uri: 'avatar/avatar-45.jpg',
  			mime: 'image/jpeg'
  		};
  		var avatarHeperRecordStub = sandbox.stub(avatarHelper, 'buildImageRecord').returns(imgRecord);

			var insertedImageId = 988;
  		var imageDaoStub = sandbox.stub(imageDao, 'insertImage', function(imageData, cb) {
  			cb(null, insertedImageId);
  		})

  		var daoResult = {};
  		var userProfileEditDaoStub = sandbox.stub(userProfileEditDao, 'updateImage', function(userId, imageId, cb) {
  			cb(null, daoResult);
  		})

  		var serviceCB = function(err, userImageUri) {
  			expect(err).to.be.null;
  			expect(userImageUri).to.equal(imgDetails.uri);

  			assert.isTrue(avatarHelperDetailsStub.withArgs(userId, userProfileImage).calledOnce);
  			assert.isTrue(fsStub.withArgs(imgDetails.sourcePath, imgDetails.targetPath).calledOnce);
  			assert.isTrue(avatarHeperRecordStub.withArgs(userId, userProfileImage).calledOnce);
  			assert.isTrue(imageDaoStub.withArgs(imgRecord).calledOnce);
  			assert.isTrue(userProfileEditDaoStub.withArgs(userId, insertedImageId).calledOnce);
  			done();
  		};

  		fixture.updateAvatar(userId, userProfileImage, serviceCB);

		});

	});

});