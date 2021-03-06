angular.module('ledita-app').directive('lvlDraggable', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, el, attrs, controller) {
				angular.element(el).attr("draggable", "true");

				var id = angular.element(el).attr("id");
				attrs.$observe('id', function(value) {
					if (value) {
						id = value;
					}
				 });

				el.bind("dragstart", function(e) {
					e.dataTransfer.setData('text', id);
					$rootScope.$emit("LVL-DRAG-START");
				});

				el.bind("dragend", function(e) {
					$rootScope.$emit("LVL-DRAG-END");
				});
			}
		}
	}
]);

angular.module('ledita-app').directive('lvlDropTarget', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			scope: {
				onDrop: '&',
				id: "@"
			},
			link: function(scope, el, attrs, controller) {
				var id = angular.element(el).attr("id");

				attrs.$observe('id', function(value) {
					if (value) {
						id = value;
					}
				});
				
				el.bind("dragover", function(e) {
					if (e.preventDefault) {
						e.preventDefault(); // Necessary. Allows us to drop.
					}

					e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
					return false;
				});

				el.bind("dragenter", function(e) {
					// this / e.target is the current hover target.
					angular.element(e.target).addClass('lvl-over');
				});

				el.bind("dragleave", function(e) {
					angular.element(e.target).removeClass('lvl-over'); // this / e.target is previous target element.
				});

				el.bind("drop", function(e) {
					if (e.preventDefault) {
						e.preventDefault(); // Necessary. Allows us to drop.
					}

					if (e.stopPropogation) {
						e.stopPropogation(); // Necessary. Allows us to drop.
					}
					var data = e.dataTransfer.getData("text");
					var dest = document.getElementById(id);
					var src = document.getElementById(data);

					scope.onDrop({
						dragEl: src,
						dropEl: dest
					});
				});

				$rootScope.$on("LVL-DRAG-START", function() {
					var el = document.getElementById(id);
					angular.element(el).addClass("lvl-target");
				});

				$rootScope.$on("LVL-DRAG-END", function() {
					var el = document.getElementById(id);
					angular.element(el).removeClass("lvl-target");
					angular.element(el).removeClass("lvl-over");
				});
			}
		}
	}
]);