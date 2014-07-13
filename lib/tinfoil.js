var parseClient = function(prop){
	'use strict';
	var safari = typeof(prop.doNotTrack) ? prop.doNotTrack : false;
	var msie = typeof(prop.navigator) !== 'undefined' &&
		typeof(prop.navigator.msDoNotTrack) !== 'undefined' ?
			prop.navigator.msDoNotTrack : false;
	var other = typeof(prop.navigator) !== 'undefined' &&
		typeof(prop.navigator.doNotTrack) !== 'undefined' ?
			prop.navigator.doNotTrack : false;

	return safari || msie || other || '';
};

module.exports = function(hatOnCb, hatOffCb){
	'use strict';

	return function(target){
		var reqNoTrack = typeof(target.headers) !== 'undefined' &&
			target.headers.DNT === 1 || false;
		var navNoTrack = !!parseClient(target).match(/1|yes/) || false;
		return reqNoTrack || navNoTrack ?
			hatOnCb(target) : hatOffCb(target) || false;
	};
};
