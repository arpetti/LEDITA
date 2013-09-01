'use strict';


describe('Learning Design Service: ', function() {

  beforeEach(module('ledita-app'));

  var service;

  beforeEach(inject(function(LDService) {
    service = LDService;
  }));

  it('Service is defined', function() {
    expect(service).toBeDefined();
  });

  describe('Get Box Class: ', function() {

    it('Returns activity box when node type is ACTIVITY', function() {
      var node = {"type": "ACTIVITY"};
      var actual = service.getBoxClass(node);
      expect(actual).toEqual('actBox');
    });

  });

});