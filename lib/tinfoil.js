var noop = function () {
	'use strict';
	return false;
};

var handleHeaders = function (activeCb, inactiveCb) {
	'use strict';

	return function (req, res, next) {
		var offCb = inactiveCb || noop;
		var reqNoTrack = typeof(req.headers) !== 'undefined' &&
			(req.headers.dnt === '1' || false);

		if(typeof next === 'undefined') {
			return reqNoTrack ? activeCb(req, res) : offCb(req, res);
		}
		else {
			next();
		}
	};
};

module.exports = function (hatOnCb, hatOffCb) {
	'use strict';
	return handleHeaders(hatOnCb, hatOffCb);
};
