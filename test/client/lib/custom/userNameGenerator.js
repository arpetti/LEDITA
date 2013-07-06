(function(exports){

	var suffix = '@test.com';

	exports.buildUserName = buildUserName();

	function buildUserName() {
		return randPrefix() + suffix;
	}

	function randPrefix() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	};

})(typeof exports === 'undefined' ? this['userNameGenerator'] = {} : exports);	