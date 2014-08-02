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

		var callbackVal = reqNoTrack ? activeCb(req, res) : offCb(req, res);
		return arguments.length === 3 ? next() : callbackVal;
	};
};

module.exports = function (hatOnCb, hatOffCb) {
	'use strict';
	return handleHeaders(hatOnCb, hatOffCb);
};
