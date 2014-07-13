// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai').should();

// stubs
// /////////////////////////////////////////////////////////
var mockRequest = {
	headers : {
		DNT : 1
	}
};

var safari = {
	doNotTrack: '1'
};

var firefox = {
	navigator: {
		doNotTrack: 'yes'
	}
};

var msie = {
	navigator: {
		msDoNotTrack: 'yes'
	}
};

// modules to test
// /////////////////////////////////////////////////////////
var tinfoil = require('../../lib/tinfoil');

var putHatOn = function(data){
	'use strict';
	return data;
};

describe('tinfoilhat', function(){
	'use strict';

	describe('from request', function(){

		it('should execute first callback argument', function(){

				tinfoil(putHatOn)(mockRequest).should.equal(mockRequest);
		});
	});

	describe('from client', function(){

		describe('when safari', function(){

			it('should execute first callback argument', function(){

				tinfoil(putHatOn)(safari).should.equal(safari);
			});
		});

		describe('when firefox', function(){

			it('should execute first callback argument', function(){

				tinfoil(putHatOn)(firefox).should.equal(firefox);
			});
		});

		describe('when msie', function(){

			it('should execute first callback argument', function(){

				tinfoil(putHatOn)(msie).should.equal(msie);
			});
		});
	});
});
