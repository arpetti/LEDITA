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
            "    <i class='icon-home'></i> Modalità: <span class='nodeBodyText'>{{ node.modality }}</span> " +
            "</p> " +
            "<p class='tabText'> " +
            "    <i class='icon-time'></i> Durata: <span class='nodeBodyText'>{{ node | durationDisplay }} <span ng-show='!(node | durationDisplay)'> A scelta</span></span> " +
            "</p> " +
            "<p class='tabText'><i class='icon-th-large'></i> Organizzazione degli studenti: " +
            "    <span class='nodeBodyText'>{{ node.org_label }}</span> " +
            "</p> " +
            "<p class='tabText' ng-show='node.technologies'><i class='icon-facetime-video'></i> Tecnologie usate: " +
            "    <span ng-repeat='tech in node.technologies' class='nodeBodyText border techRepeater'>{{ tech.technology_name }}</span> " +
            "</p> " +
            "<p class='tabText' ng-show='node.resources'><i class='icon-briefcase'></i> Risorse didattiche: " +
            "    <ul ng-repeat='resource in node.resources' class='listNode resourceRepeater'> " +
            "        <li><i class='icon-chevron-right'></i> " +
            "            Nome: <span class='nodeBodyText'>{{ resource.resource_name }}</span> " +
            "            | Tipo:<span class='nodeBodyText'>{{ resource.resource_type }}</span><span ng-show='resource.resource_copy'> | " +
            "            Copyright: <span " +
            "                class='nodeBodyText'>{{ resource.resource_copy }}</span></span><span ng-show='resource.resource_descr'> | Descrizione: <span " +
            "                class='nodeBodyText'>{{ resource.resource_descr }}</span></span><span ng-show='resource.resource_link'> | <span " +
            "                class='nodeBodyText'><a ng-href='{{ resource.resource_link }}' target='_blank'>Link</a></span></span> " +
            "        </li> " +
            "    </ul> " +
            "</p> " +
            "<p class='tabText' ng-show='node.pract_descr'><i class='icon-info-sign'></i> Descrizione dell'attività:<br> " +
            "    <span class='nodeBodyText'>{{ node.pract_descr }}</span> " +
            "</p> " +
            "<span ng-show='showped' ><p class='tabText' ng-show='node.edu_descr'><i class='icon-question-sign'></i> Suggerimenti pedagogici:<br> " +
            "    <span class='nodeBodyText'>{{ node.edu_descr }}</span></p></span> " +
            "</span>",
        replace: true,        
        transclude: false,    
        link: function(scope, element, attrs) {
        }
    };
}]);

angular.module('ledita-app')
.directive('lddetail', [function() {
    return {
        restrict: 'E',
        scope: { 
            node: '=' 
        },
        template:
            "<span> " +
            "<p class='tabText' ng-show='node.qcers'><i class='icon-tasks' ></i> " +
            "    Livello QCER: <span ng-repeat='qcer in node.qcers' class='nodeBodyText'>{{ qcer.qcer_name }}</span> " +
            "</p> " +
                "<p class='tabText'> " +
                "    <i class='icon-bell'></i> " +
                "     Ambito: <span class='nodeBodyText'>{{ node.scope }}</span> " +
                "</p> " +
                "<p class='tabText'><i class='icon-share'></i> " +
            "    <span class='nodeBodyText'> <a ng-href='/ld/{{ node.node_id }}{{ node.group_child_id }}'>Link</a></span> " +
            "</p> " +
            "</span>",
        replace: true,        
        transclude: false,    
        link: function(scope, element, attrs) {
        }
    };
}]);

/* Custom blur directive reference: http://jsfiddle.net/l_ong/7QFS7/ */
angular.module('ledita-app')
.directive('uiBlur', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	element.bind('blur', function() {
        		scope.$apply(attrs.uiBlur);
        	});
        }
    };
}]);