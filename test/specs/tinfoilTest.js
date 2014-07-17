// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
chai.should();

// stubs
// /////////////////////////////////////////////////////////
var mockRequest = {
	on : {
		headers : {
			dnt : '1'
		}
	},
	off : {
		headers : {
			dnt : ''
		}
	}
};

var safari = {
	on : {
		doNotTrack : '1'
	},
	off : {
		doNotTrack : ''
	}
};

var firefox = {
	on : {
		navigator : {
			doNotTrack : 'yes'
		}
	},
	off : {
		navigator : {
			doNotTrack : 'no'
		}
	}
};

var msie = {
	on : {
		navigator : {
			msDoNotTrack : 'yes'
		}
	},
	off : {
		navigator : {
			doNotTrack : 'no'
		}
	}
};

// modules to test
// /////////////////////////////////////////////////////////
var tinfoil = require('../../lib/tinfoil');

var putHatOn = function (data) {
	'use strict';
	return data;
};

var removeHat = function (data) {
	'use strict';
	return {inactive : data};
};

describe('tinfoilhat', function () {
	'use strict';

	describe('when DO NOT TRACK is active', function () {
		describe('from request', function () {
			it('should execute first callback argument', function () {
				tinfoil(putHatOn)(mockRequest.on).should.equal(mockRequest.on);
			});
		});

		describe('from client', function () {
			describe('when safari', function () {
				it('should execute first callback argument', function () {
					tinfoil(putHatOn)(safari.on).should.equal(safari.on);
				});
			});

			describe('when firefox', function () {
				it('should execute first callback argument', function () {
					tinfoil(putHatOn)(firefox.on).should.equal(firefox.on);
				});
			});

			describe('when msie', function () {
				it('should execute first callback argument', function () {
					tinfoil(putHatOn)(msie.on).should.equal(msie.on);
				});
			});
		});
	});

	describe('when DO NOT TRACK is inactive/off', function () {
		describe('from request', function () {
			it('should execute second callback argument', function () {
				tinfoil(putHatOn, removeHat)(mockRequest.off).inactive
					.should.equal(mockRequest.off);
			});
		});

		describe('from client', function () {
			describe('when safari', function () {
				it('should execute second callback argument', function () {
					tinfoil(putHatOn, removeHat)(safari.off).inactive
						.should.equal(safari.off);
				});
			});

			describe('when firefox', function () {
				it('should execute second callback argument', function () {
					tinfoil(putHatOn, removeHat)(firefox.off).inactive
						.should.equal(firefox.off);
				});
			});

			describe('when msie', function () {
				it('should execute second callback argument', function () {
					tinfoil(putHatOn, removeHat)(msie.off).inactive
						.should.equal(msie.off);
				});
			});
		});
	});
});
