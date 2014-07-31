var noop = function () {
	'use strict';
	return false;
};

var getTrackHandler = function (activeCb, inactiveCb) {
	'use strict';

	return function (req, res) {
		var offCb = inactiveCb || noop;
		var reqNoTrack = typeof(req.headers) !== 'undefined' &&
			(req.headers.dnt === '1' || false);

		return reqNoTrack ? activeCb(req, res) : offCb(req, res);
	};
};

var handleHeaders = function (activeCb, inactiveCb) {
	'use strict';
	return getTrackHandler(activeCb, inactiveCb);
};

module.exports = function (hatOnCb, hatOffCb) {
	'use strict';
	return handleHeaders(hatOnCb, hatOffCb);
};
