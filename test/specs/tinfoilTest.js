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
			dnt : '0'
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
	});

	describe('when DO NOT TRACK is inactive/off', function () {
		describe('from request with callback', function () {
			it('should execute second callback argument', function () {
				tinfoil(putHatOn, removeHat)(mockRequest.off).inactive
					.should.equal(mockRequest.off);
			});
		});

		describe('from request without callback', function () {
			it('should return false', function () {
				tinfoil(putHatOn)(mockRequest.off).should.equal(false);
			});
		});
	});
});
