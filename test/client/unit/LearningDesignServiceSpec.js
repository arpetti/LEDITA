'use strict';


describe('Learning Design Service: ', function () {

    beforeEach(module('ledita-app'));

    var service;

    beforeEach(inject(function (LDService) {
        service = LDService;
    }));

    it('Service is defined', function () {
        expect(service).toBeDefined();
    });

    describe('Get Box Class: ', function () {

        it('Returns actBox class when node type is ACTIVITY', function () {
            var node = {"type": "ACTIVITY"};
            var actual = service.getBoxClass(node);
            expect(actual).toEqual('actBox');
        });

        it('Returns ldBox class when node type is LD', function () {
            var node = {"type": "LD"};
            var actual = service.getBoxClass(node);
            expect(actual).toEqual('ldBox');
        });

        it('Returns empty string for unknown node type', function () {
            var node = {"type": "UNICORN"};
            var actual = service.getBoxClass(node);
            expect(actual).toEqual('');
        });

        it('Returns empty string for node with no type', function () {
            var node = {};
            var actual = service.getBoxClass(node);
            expect(actual).toEqual('');
        });

        describe('Group Class determined based on Max Position: ', function () {

            it('Returns groupBox1 when node is ACTIVITY_GROUP and max_position is 1', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": 1};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('groupBox1');
            });

            it('Returns groupBox2 when node is ACTIVITY_GROUP and max_position is 2', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": 2};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('groupBox2');
            });

            it('Returns groupBox3 when node is ACTIVITY_GROUP and max_position is 3', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": 3};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('groupBox3');
            });

            it('Returns groupBox4 when node is ACTIVITY_GROUP and max_position is 4', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": 4};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('groupBox4');
            });

            it('Returns empty string when node is ACTIVITY_GROUP and max_position is greater than 4', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": 5};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('');
            });

            it('Returns empty string when node is ACTIVITY_GROUP and max_position is less than 1', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": 0};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('');
            });

            it('Returns empty string when node is ACTIVITY_GROUP and max_position is not numeric', function () {
                var node = {"type": "ACTIVITY_GROUP", "max_position": "The biggest number ever!"};
                var actual = service.getBoxClass(node);
                expect(actual).toEqual('');
            });

        });


        describe('Get Group Box Class: ', function () {

            it('Returns actBox class when node type is ACTIVITY', function () {
                var node = {"group_child_type": "ACTIVITY"};
                var actual = service.getGroupBoxClass(node);
                expect(actual).toEqual('actBox');
            });

            it('Returns ldBox class when node type is LD', function () {
                var node = {"group_child_type": "LD"};
                var actual = service.getGroupBoxClass(node);
                expect(actual).toEqual('ldBox');
            });

            it('Returns empty string for unknown node type', function () {
                var node = {"group_child_type": "UNICORN"};
                var actual = service.getGroupBoxClass(node);
                expect(actual).toEqual('');
            });

            it('Returns empty string for node with no type', function () {
                var node = {};
                var actual = service.getGroupBoxClass(node);
                expect(actual).toEqual('');
            });
        });

    });   });