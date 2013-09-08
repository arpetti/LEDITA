'use strict';

/*
* Angular Directive References:
*   http://www.codeproject.com/Articles/607873/Extending-HTML-with-AngularJS-Directives
*   http://jsfiddle.net/Wijmo/LyJ2T/
*/

angular.module('ledita-app')
.directive('activitydetail', [function() {
    return {
        restrict: 'E',
        scope: { 
            showped: "@", 
            node: '=' 
        },
        template:
            "<span> " +
            "<p class='tabText'> " +
            "    <i class='icon-home'></i> Modality: <span class='nodeBodyText'>{{ node.modality }}</span> " +
            "</p> " +
            "<p class='tabText'> " +
            "    <i class='icon-time'></i> Duration: <span class='nodeBodyText'>{{ node | durationDisplay }}</span> " +
            "</p> " +
            "<p class='tabText'><i class='icon-th-large'></i> Students' organization: " +
            "    <span class='nodeBodyText'>{{ node.org_label }}</span> " +
            "</p> " +
            "<p class='tabText' ng-show='node.technologies'><i class='icon-facetime-video'></i> Used Technologies: " +
            "    <span ng-repeat='tech in node.technologies' class='nodeBodyText border'>{{ tech.technology_name }}</span> " +
            "</p> " +
            "<p class='tabText' ng-show='node.resources'><i class='icon-briefcase'></i> Didactical Resources: " +
            "    <ul ng-repeat='resource in node.resources' class='listNode'> " +
            "        <li><i class='icon-chevron-right'></i> " +
            "            Name: <span class='nodeBodyText'>{{ resource.resource_name }}</span> " +
            "            | Type:<span class='nodeBodyText'>{{ resource.resource_type }}</span><span ng-show='resource.resource_copy'> | " +
            "            Copyright: <span " +
            "                class='nodeBodyText'>{{ resource.resource_copy }}</span></span><span ng-show='resource.resource_descr'> | Description: <span " +
            "                class='nodeBodyText'>{{ resource.resource_descr }}</span></span><span ng-show='resource.resource_link'> | <span " +
            "                class='nodeBodyText'><a ng-href='{{ resource.resource_link }}' target='_blank'>Link</a></span></span> " +
            "        </li> " +
            "    </ul> " +
            "</p> " +
            "<p class='tabText' ng-show='node.pract_descr'><i class='icon-info-sign'></i> Activity Description:<br> " +
            "    <span class='nodeBodyText'>{{ node.pract_descr }}</span> " +
            "</p> " +
            "<span ng-show='showped' ><p class='tabText' ng-show='node.edu_descr'><i class='icon-question-sign'></i> Pedagogical Suggestions:<br> " +
            "    <span class='nodeBodyText'>{{ node.edu_descr }}</span></p></span> " +
            "</span>",
        replace: true,        
        transclude: false,    
        link: function(scope, element, attrs) {
        }
    };
}]);