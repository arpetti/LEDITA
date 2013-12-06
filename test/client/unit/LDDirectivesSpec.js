'use strict';


describe('LD Directives', function () {
    var $compile;
    var $rootScope;
    var node;

    beforeEach(module('ledita-app'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        node =
        {
            "ld_id": 1,
            "ld_name": "Learningà Designè Titleì Demoò 1ù é",
            "level": 1,
            "position": 1,
            "node_id": 5,
            "node_name": "Support Activity 1",
            "scope": null,
            "type": "ACTIVITY",
            "org_label": "Classe",
            "dur_min": 0,
            "dur_hh": 0,
            "dur_dd": 15,
            "dur_mon": 1,
            "pract_descr": "Practical description: what to do for the execution of this activity",
            "edu_descr": "Pedagogical Description: how to obtain better results and improve learning during the activity",
            "modality": "Online",
            "technologies": [
                {
                    "activity_id": 5,
                    "activity_name": "Support Activity 1",
                    "technology_id": 5,
                    "technology_name": "Internet"
                }
            ],
            "resources": [
                {
                    "activity_id": 5,
                    "activity_name": "Support Activity 1",
                    "resource_id": 3,
                    "resource_name": "Didactical resource name 3",
                    "resource_type": "video",
                    "resource_descr": "Description of the didactical resource number 3",
                    "resource_copy": null,
                    "resource_link": "http://#"
                }
            ]
        };
    }));


    it('Displays Activity Details', function () {
        $rootScope.node = node;
        var element = $compile("<activitydetail node='node'></activitydetail>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);

        expect(element.html()).toMatch(
            'Modalità: <span class="nodeBodyText ng-binding">' + node.modality + '</span>');
        expect(element.html()).toMatch(
            'Durata: <span class="nodeBodyText ng-binding">1 m. 15g. ');
        expect(element.html()).toMatch(
            'Organizzazione desgli studenti:     <span class="nodeBodyText ng-binding">' + node.org_label + '</span>');
        expect(element.html()).toMatch(
            '<span ng-repeat="tech in node.technologies" class="nodeBodyText border ng-scope ng-binding">' +
                node.technologies[0].technology_name + '</span>');
        expect(element.html()).toMatch(
            '<span class="nodeBodyText ng-binding">' + node.resources[0].resource_name + '</span>');
        expect(element.html()).toMatch(
            'Tipo:<span class="nodeBodyText ng-binding">' + node.resources[0].resource_type + '</span>');
        expect(element.html()).toMatch(
            '<span class="nodeBodyText ng-binding">' + node.pract_descr + '</span>');
    });

    it('Hides Pedagogical Description', function () {
        $rootScope.node = node;
        var element = $compile("<activitydetail node='node'></activitydetail>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch('span ng-show="showped" style="display: none;');
    });

    it('Shows Pedagogical Description', function () {
        $rootScope.node = node;
        var element = $compile("<activitydetail node='node' showped='true'></activitydetail>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch('span ng-show="showped" style="display: none;"');
        expect(element.html()).toMatch('<span class="nodeBodyText ng-binding">' + node.edu_descr + '</span>');
    });

    it('Displays Learning Design Details', function () {
        var ldnode =
        {
            "ld_id": 1,
            "scope": "Semester",
            "type": "LD",
            "qcers": [
                {
                    "ld_id": 1,
                    "qcer_name": "A1"
                },
                {
                    "ld_id": 1,
                    "qcer_name": "A2"
                }
            ]
        };
        $rootScope.node = ldnode;
        var element = $compile("<lddetail node='node'></lddetail>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch(
            'Ambito: <span class="nodeBodyText ng-binding">' + ldnode.scope + '</span>');
        expect(element.html()).toMatch(
            'span ng-repeat="qcer in node.qcers" class="nodeBodyText ng-scope ng-binding">' + ldnode.qcers[0].qcer_name + '</span>');
        expect(element.html()).toMatch(
            'span ng-repeat="qcer in node.qcers" class="nodeBodyText ng-scope ng-binding">' + ldnode.qcers[1].qcer_name + '</span>');
    });

	it('Responds to blur', function() {
		$rootScope.doSomething = function(){}
		spyOn($rootScope, 'doSomething');

		var element = $compile("<input ng-model='mymodel' ui-Blur='doSomething()' />")($rootScope);
		$rootScope.$digest();
		angular.element(element).triggerHandler('blur');

		expect($rootScope.doSomething).toHaveBeenCalledWith();
	});

});

