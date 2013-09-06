'use strict';

describe('Activity Duration Display', function() {

    beforeEach(module('activityDurationDisplay'));

        describe('Activity Duration', function() {

            it('Displays minutes', inject(function(durationDisplayFilter) {
                var node = {"dur_min": 15};
                expect(durationDisplayFilter(node)).toBe('15 min.');
            }));

            it('Displays hours', inject(function(durationDisplayFilter) {
                var node = {"dur_hh": 2};
                expect(durationDisplayFilter(node)).toBe('2 h.');
            }));

            it('Displays days', inject(function(durationDisplayFilter) {
                var node = {"dur_dd": 10};
                expect(durationDisplayFilter(node)).toBe('10 d.');
            }));

            it('Displays months', inject(function(durationDisplayFilter) {
                var node = {"dur_mon": 3};
                expect(durationDisplayFilter(node)).toBe('3 mo.');
            }));

            it('Displays minutes and hours', inject(function(durationDisplayFilter) {
                var node = {"dur_min": 15, "dur_hh": 3};
                expect(durationDisplayFilter(node)).toBe('3 h. 15 min.');
            }));

            it('Does not show 0 units', inject(function(durationDisplayFilter) {
                var node = {"dur_min": 15, "dur_hh": 0, "dur_dd": 5};
                expect(durationDisplayFilter(node)).toBe('5 d. 15 min.');
            }));

            it('Does not show anything if all units are 0', inject(function(durationDisplayFilter) {
                var node = {"dur_min": 0, "dur_hh": 0, "dur_dd": 0, "dur_mon": 0};
                expect(durationDisplayFilter(node)).toBe('');
            }));

        });
});