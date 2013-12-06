/*  
 * Array.filter is a JavaScript extension to the ECMA-262 standard.
 * This code is for older browsers that don't natively support it.
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp*/) {
        'use strict';

        if (!this) {
            throw new TypeError();
        }

        var objects = Object(this);
        var len = objects.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i in objects) {
            if (objects.hasOwnProperty(i)) {
                if (fun.call(thisp, objects[i], i, objects)) {
                    res.push(objects[i]);
                }
            }
        }

        return res;
    };
}

angular.module('activityDurationDisplay', []).filter('durationDisplay', function () {
    return function (input) {

        var monthDisplay = (input.dur_mon && input.dur_mon != 0) ? input.dur_mon + ' m.' : null;
        var dayDisplay = (input.dur_dd && input.dur_dd != 0) ? input.dur_dd + ' g.' : null;
        var hourDisplay = (input.dur_hh && input.dur_hh != 0) ? input.dur_hh + ' h.' : null;
        var minuteDisplay = (input.dur_min && input.dur_min != 0) ? input.dur_min + ' min.' : null;

        function isNotNull(element) {
            return element != null;
        }

        return [monthDisplay, dayDisplay, hourDisplay, minuteDisplay].filter(isNotNull).join(" ");
    };
});