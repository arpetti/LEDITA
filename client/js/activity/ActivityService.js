angular.module('ledita-app')
.factory('ActivityService', function($http) {

	var DragSource = function DragSource(data) {
  		this.nodeId = data[0];
  		this.nodeType = data[1];
  		this.level = parseInt(data[2]);
  		this.position = parseInt(data[3]);
	};

	var DropTarget = function DropTarget(data) {
		this.nodeId = data[0];
  		this.nodeType = data[1];
  		this.level = parseInt(data[2]);
  		this.position = parseInt(data[3]);
  		this.move = data[4];
	};

	var DropTargetGroup = function DropTarget(data) {
		this.groupId = parseInt(data[0]);
		this.nodeId = data[1];
  		this.nodeType = data[2];
  		this.level = parseInt(data[3]);
  		this.position = parseInt(data[4]);
  		this.move = data[5];
	};

    return {
        
		parseDragSource: function(dragElementId) {
			var data = dragElementId.split('-');
			return new DragSource(data);
		},

		parseDropTarget: function(dropElementId) {
			var data = dropElementId.split('-');
			return new DropTarget(data);
		},

		parseDropTargetGroup: function(dropElementId) {
			var data = dropElementId.split('-');
			return new DropTargetGroup(data);
		}  

    };
});