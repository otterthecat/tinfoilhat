var findNavigator = function (win) {
	'use strict';

	var hasNavigator = typeof(win.navigator) !== 'undefined';
	return hasNavigator ? win.navigator : false;
};


var checkProperty = function (target, property) {
	'use strict';

	if (target) {
		return target[property];
	}
	return false;
};


var parseClient = function (prop) {
	'use strict';

	var safari = typeof(prop.doNotTrack) ? prop.doNotTrack : false;
	var msie = checkProperty(findNavigator(prop), 'msDoNotTrack');
	var other = checkProperty(findNavigator(prop), 'doNotTrack');

	return safari || msie || other || '';
};

module.exports = function (hatOnCb, hatOffCb) {
	'use strict';

	return function (target) {
		var reqNoTrack = typeof(target.headers) !== 'undefined' &&
			target.headers.DNT === 1 || false;
		var navNoTrack = !!parseClient(target).match(/1|yes/) || false;
		return reqNoTrack || navNoTrack ?
			hatOnCb(target) : hatOffCb(target) || false;
	};
};
