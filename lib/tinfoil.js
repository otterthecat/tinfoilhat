var noop = function () {
	'use strict';
	return false;
};

var handleHeaders = function (activeCb, inactiveCb) {
	'use strict';

	var offCb = inactiveCb || noop;
	return function (target) {
		var reqNoTrack = typeof(target.headers) !== 'undefined' &&
			(target.headers.dnt === '1' || false);

		return reqNoTrack ? activeCb(target) : offCb(target);
	};
};

module.exports = function (hatOnCb, hatOffCb) {
	'use strict';
	return handleHeaders(hatOnCb, hatOffCb);
};
