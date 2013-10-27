'use strict';

ddescribe('Activity Service', function() {

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
    	var dropElementId = '4-3';
    	var actual = service.parseDropTarget(dropElementId);
    	expect(actual.level).toEqual(4);
    	expect(actual.position).toEqual(3);
    });

});