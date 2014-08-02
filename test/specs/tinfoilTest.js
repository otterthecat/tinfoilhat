/* jshint expr: true */
// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

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

var mockResponse = {};

var putHatOn = sinon.spy(function (req, res) {
	'use strict';
	return {
		isActive : true,
		request : req,
		response : res
	};
});

var removeHat = sinon.spy(function (req, res) {
	'use strict';
	return {
		isActive : false,
		request : req,
		response : res
	};
});

var mockNext = sinon.spy(function () {});


// modules to test
// /////////////////////////////////////////////////////////
var tinfoil = require('../../lib/tinfoil');

describe('tinfoilhat', function () {
	'use strict';

	describe('when used as middleware, ', function () {
		describe('when DO NOT TRACK is active, ', function () {
			describe('from request', function () {
				tinfoil(putHatOn)(mockRequest.on, mockResponse, mockNext);

				it('should pass request & response to "active" callback', function () {
					putHatOn.should.have.been.calledWith(mockRequest.on, mockResponse);
				});

				it('should call passed "next()" function', function () {
					mockNext.should.have.been.called;
				});
			});
		});

		describe('when DO NOT TRACK is inactive/off', function () {
			describe('from request with callback', function () {
				tinfoil(putHatOn, removeHat)(mockRequest.off, mockResponse, mockNext);

				it('should execute second callback argument', function () {
					removeHat.should.have.been.called;
				});

				it('should call passed "next()" function', function () {
					mockNext.should.have.been.called;
				});
			});
		});
	});

	describe('when used to return callback', function () {
		describe('when DO NOT TRACK is active', function () {
			describe('from request', function () {
				it('should execute first callback argument', function () {
					tinfoil(putHatOn)(mockRequest.on, mockResponse).request.should
						.equal(mockRequest.on, mockResponse);
				});

				it('should pass request & response to "active" callback', function () {
					putHatOn.should.have.been.calledWith(mockRequest.on, mockResponse);
				});
			});
		});

		describe('when DO NOT TRACK is inactive/off', function () {
			describe('from request with callback', function () {
				it('should execute second callback argument', function () {
					tinfoil(putHatOn, removeHat)(mockRequest.off, mockResponse).request
						.should.equal(mockRequest.off);
				});

				it('should call "off" callback with request & response', function () {
					removeHat.should.always.have.been
						.calledWith(mockRequest.off, mockResponse);
				});
			});

			describe('from request without callback', function () {
				it('should return false', function () {
					tinfoil(putHatOn)(mockRequest.off, mockResponse).should.equal(false);
				});
			});
		});
	});
});
