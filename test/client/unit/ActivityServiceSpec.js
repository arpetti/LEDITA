'use strict';

describe('Activity Service', function() {

	beforeEach(module('ledita-app'));

    var service;

    beforeEach(inject(function (ActivityService) {
        service = ActivityService;
    }));

    it('Service is defined', function () {
        expect(service).toBeDefined();
    });

    it('Parses Drag Source', function() {
    	var dragElementId = '10-LD-2-1';
    	var actual = service.parseDragSource(dragElementId);
    	expect(actual.nodeId).toEqual('10');
    	expect(actual.nodeType).toEqual('LD');
    	expect(actual.level).toEqual(2);
    	expect(actual.position).toEqual(1);
    });

    it('Parses Drop Target', function() {
    	var dropElementId = '12-ACTIVITY-3-4-top';
    	var actual = service.parseDropTarget(dropElementId);
    	expect(actual.nodeId).toEqual('12');
    	expect(actual.nodeType).toEqual('ACTIVITY');
    	expect(actual.level).toEqual(3);
    	expect(actual.position).toEqual(4);
    	expect(actual.move).toEqual('top');
    });

    it('Parses Group Drop Target', function() {
    	var dropElementId = '32-12-ACTIVITY-3-4-top';
    	var actual = service.parseDropTargetGroup(dropElementId);
    	expect(actual.groupId).toEqual(32);
    	expect(actual.nodeId).toEqual('12');
    	expect(actual.nodeType).toEqual('ACTIVITY');
    	expect(actual.level).toEqual(3);
    	expect(actual.position).toEqual(4);
    	expect(actual.move).toEqual('top');
    });

});