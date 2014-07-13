// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai').should();
var sinon = require('sinon');

// stubs
// /////////////////////////////////////////////////////////
var mockRequest = {
	headers : {
		DNT : 1
	}
};

// modules to test
// /////////////////////////////////////////////////////////
var tinfoil = require('../../lib/tinfoil');

describe('tinfoil()', function(){

	describe('from request', function(){

		it('should run first callback argument if user does not wish to be tracked', function(){

				tinfoil(function(data){
					return data;
				})(mockRequest).should.equal(mockRequest);
		});
	});
});
