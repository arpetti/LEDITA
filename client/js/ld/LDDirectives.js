'use strict';


angular.module('ledita-app')
.directive('activitydetail', [function() {
    return {
        restrict: 'E',
        scope: { node: '=' },
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
            "<p class='tabText'><i class='icon-briefcase'></i> Didactical Resources: " +
            "    <ul ng-repeat='resource in node.resources' class='listNode'> " +
            "        <li><i class='icon-chevron-right'></i> " +
            "            Name: <span class='nodeBodyText'>{{ resource.resource_name }}</span> " +
            "            | Type:<span class='nodeBodyText'>{{ resource.type }}</span> | " +
            "            Copyright: <span " +
            "                class='nodeBodyText'>{{ resource.resource_copy }}</span> | Description: <span " +
            "                class='nodeBodyText'>{{ resource.resource_descr }}</span> | <span " +
            "                class='nodeBodyText'><a ng-href='{{ resource.resource_link }}'>Link</a></span> " +
            "        </li> " +
            "    </ul> " +
            "</p> " +
            "<p class='tabText'><i class='icon-info-sign'></i> Activity Description:<br> " +
            "    <span class='nodeBodyText'>{{ node.pract_descr }}</span> " +
            "</p> " +
            "<p class='tabText'><i class='icon-question-sign'></i> Pedagogical Suggestions:<br> " +
            "    <span class='nodeBodyText'>{{ node.edu_descr }}</span></p> " +
            "</span>",
        replace: true,        // replace original markup with template
        transclude: false,    // do not copy original HTML content
        link: function($scope, element, attrs) {
            // TODO: Pedagogical Suggestions should only be displayed for Teacher View
        }
    };
}]);