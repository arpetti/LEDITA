angular.module('ledita-app')
.factory('ActivityService', function($http) {

	var DragSource = function DragSource(data) {
  		this.nodeId = data[0];
  		this.nodeType = data[1];
  		this.level = parseInt(data[2]);
  		this.position = parseInt(data[3]);
	}

    return {
        
		parseDragSource: function(dragElementId) {
			var data = dragElementId.split('-');
			return new DragSource(data);
		}  

    };
});