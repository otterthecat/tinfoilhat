var noop = function () {
	'use strict';
	return false;
};

var handleHeaders = function (activeCb, inactiveCb) {
	'use strict';

	var offCb = inactiveCb || noop;
	return function (req, res) {
		var reqNoTrack = typeof(req.headers) !== 'undefined' &&
			(req.headers.dnt === '1' || false);

		return reqNoTrack ? activeCb(req, res) : offCb(req, res);
	};
};

module.exports = function (hatOnCb, hatOffCb) {
	'use strict';
	return handleHeaders(hatOnCb, hatOffCb);
};
