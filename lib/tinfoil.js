module.exports = function(hatOnCb, hatOffCb){
	'use strict';
	return function(target){

		var reqNoTrack = target.headers.DNT === 1 || false;
		var navNoTrack = (target.doNotTrack === 1 || target.msDoNotTrack === 1) || false;
		return reqNoTrack || navNoTrack ? hatOnCb(target) : hatOffCb(target) || false;
	};
};
