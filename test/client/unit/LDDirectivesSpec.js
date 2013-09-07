'use strict';


describe('LD Directives', function() {
    var $compile;
    var $rootScope;
    var node;
 
    beforeEach(module('ledita-app'));
 
    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        node = 
            {
              "ld_id": 1,
              "ld_name": "Learning Design Title Demo 1",
              "level": 1,
              "position": 1,
              "node_id": 5,
              "node_name": "Support Activity 1",
              "scope": null,
              "type": "ACTIVITY",
              "org_label": "ALL",
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
                  "resource_descr": "Description of the didactical resource number 3",
                  "resource_copy": null,
                  "resource_link": "http://#"
                }
              ]
            };
    }));


    it('Displays Activity Details', function() {
        $rootScope.node = node;
        var element = $compile("<activitydetail node='node'></activitydetail>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);

        expect(element.html()).toMatch(
            'Modality: <span class="nodeBodyText ng-binding">' + node.modality + '</span>');
        expect(element.html()).toMatch(
            'Duration: <span class="nodeBodyText ng-binding">1 mo. 15 d.</span>');
        expect(element.html()).toMatch(
            'organization:     <span class="nodeBodyText ng-binding">' + node.org_label + '</span>');
        expect(element.html()).toMatch(
            '<span ng-repeat="tech in node.technologies" class="nodeBodyText border ng-scope ng-binding">' + 
                node.technologies[0].technology_name + '</span>');
        expect(element.html()).toMatch(
            '<span class="nodeBodyText ng-binding">' + node.resources[0].resource_name + '</span>');
        expect(element.html()).toMatch(
            '<span class="nodeBodyText ng-binding">' + node.pract_descr + '</span>');
    });
    
    it('Hides Pedagogical Description', function() {
        $rootScope.node = node;
        var element = $compile("<activitydetail node='node'></activitydetail>")($rootScope);
        $rootScope.$digest();
        
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch('p ng-show="showped" class="tabText" style="display: none;"');
    });

    it('Shows Pedagogical Description', function() {
        $rootScope.node = node;
        var element = $compile("<activitydetail node='node' showped='true'></activitydetail>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch('p ng-show="showped" class="tabText" style="display: none;"');
        expect(element.html()).toMatch('p ng-show="showped" class="tabText"');
    });
});