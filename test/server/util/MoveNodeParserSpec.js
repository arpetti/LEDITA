var expect = require('chai').expect
var fixture = require('../../../server/util/MoveNodeParser');

describe('Move Node Parser', function() {

	it('Parses source and target for move type: level', function() {
		var sourceId = '10-ACTIVITY-6-1';
		var targetId = 'level-3';

		var result = fixture.parseSourceTargetIds(sourceId, targetId);

		expect(result.source.nodeId).to.equal(10);
		expect(result.source.nodeType).to.equal('ACTIVITY');
		expect(result.source.level).to.equal(6);
		expect(result.source.position).to.equal(1);
		
		expect(result.target.moveType).to.equal('level');
		expect(result.target.level).to.equal(3);
		expect(result.target.position).to.be.null;
	});

	it('Parses source and target for move type: levelPosition', function() {
		var sourceId = '22-LD-6-1';
		var targetId = 'levelPosition-3-1';

		var result = fixture.parseSourceTargetIds(sourceId, targetId);

		expect(result.source.nodeId).to.equal(22);
		expect(result.source.nodeType).to.equal('LD');
		expect(result.source.level).to.equal(6);
		expect(result.source.position).to.equal(1);
		
		expect(result.target.moveType).to.equal('levelPosition');
		expect(result.target.level).to.equal(3);
		expect(result.target.position).to.equal(1);
	});

	it('Parses source and target for move type: maxPosition', function() {
		var sourceId = '22-LD-6-1';
		var targetId = 'maxPosition-3';

		var result = fixture.parseSourceTargetIds(sourceId, targetId);

		expect(result.source.nodeId).to.equal(22);
		expect(result.source.nodeType).to.equal('LD');
		expect(result.source.level).to.equal(6);
		expect(result.source.position).to.equal(1);
		
		expect(result.target.moveType).to.equal('maxPosition');
		expect(result.target.level).to.equal(3);
		expect(result.target.position).to.be.null;
	});

	it('Parses source and target for move type: maxLevel', function() {
		var sourceId = '22-LD-6-1';
		var targetId = 'maxLevel';

		var result = fixture.parseSourceTargetIds(sourceId, targetId);

		expect(result.source.nodeId).to.equal(22);
		expect(result.source.nodeType).to.equal('LD');
		expect(result.source.level).to.equal(6);
		expect(result.source.position).to.equal(1);
		
		expect(result.target.moveType).to.equal('maxLevel');
		expect(result.target.level).to.be.null;
		expect(result.target.position).to.be.null;
	});

});