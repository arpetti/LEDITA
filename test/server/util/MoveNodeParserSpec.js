var expect = require('chai').expect
var fixture = require('../../../server/util/MoveNodeParser');

describe('Move Node Parser', function() {

	it('Parses Source ID', function() {
		var sourceId = '10-ACTIVITY-6-1';
		var result = fixture.parseSourceId(sourceId);

		expect(result.nodeId).to.equal(10);
		expect(result.nodeType).to.equal('ACTIVITY');
		expect(result.level).to.equal(6);
		expect(result.position).to.equal(1);
	});

	it('Parses target ID for move type: level', function() {
		var targetId = 'level-3';
		var result = fixture.parseTargetId(targetId);
		
		expect(result.moveType).to.equal('level');
		expect(result.level).to.equal(3);
		expect(result.position).to.be.null;
	});

	it('Parses target ID for move type: levelPosition', function() {
		var targetId = 'levelPosition-3-1';
		var result = fixture.parseTargetId(targetId);
		
		expect(result.moveType).to.equal('levelPosition');
		expect(result.level).to.equal(3);
		expect(result.position).to.equal(1);
	});

	it('Parses target ID for move type: maxPosition', function() {
		var targetId = 'maxPosition-3';
		var result = fixture.parseTargetId(targetId);

		expect(result.moveType).to.equal('maxPosition');
		expect(result.level).to.equal(3);
		expect(result.position).to.be.null;
	});

	it('Parses target ID for move type: maxLevel', function() {
		var targetId = 'maxLevel';
		var result = fixture.parseTargetId(targetId);
		
		expect(result.moveType).to.equal('maxLevel');
		expect(result.level).to.be.null;
		expect(result.position).to.be.null;
	});

});