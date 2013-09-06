'use strict';

describe('Activity Duration Display', function() {

    beforeEach(module('activityDurationDisplay'));

        describe('Activity Duration', function() {

            it('Only shows minutes', inject(function(durationDisplayFilter) {
                var node = {"dur_min": 15};
                expect(durationDisplayFilter(node)).toBe('15min');
             }));

        });
});