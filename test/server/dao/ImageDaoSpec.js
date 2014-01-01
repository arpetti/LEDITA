var chai = require('chai');
var expect = require('chai').expect
var dao = require('../../../server/dao/Dao');
var fixture = require('../../../server/dao/ImageDao');

describe('Image DAO', function() {

	it('Inserts an image record', function(done) {
		var cleanupImage = 'delete from image where id = ?';
		var imageData = {
			name: 'avatar-1.png',
			size: 10240,
			uri: 'avatar/avatar-1.png',
			mime: 'image/png'
		};
		fixture.insertImage(imageData, function(err, imageId) {
			expect(err).to.be.null;
			expect(imageId).to.be.above(9);
			dao.deleteRecord(cleanupImage, [imageId], function(err, result) {
				expect(err).to.be.null;
				done();
			});
		});
	});

});