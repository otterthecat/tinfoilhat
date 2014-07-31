var http = require('http');
var tinfoil = require('../index');

// function to handle if DNT is active [required]
var handleDntActive = function (request, response) {
	'use strict';
	response.end('DNT is ACTIVE');
};

// function to handle if DNT is ok with being tracked [optional]
// if not set, and DNT is not enabled, tinfoil will return false
var handleDntInactive = function (request, response) {
	'use strict';
	response.end('DNT is OFF');
};

http.createServer(function (req, res) {
	'use strict';
	res.writeHead(200, {contentType : 'text/plain'});

	// pass the 2 callbacks to tinfoil.
	// the appropriate callback is called passing the request & response
	tinfoil(handleDntActive, handleDntInactive)(req, res);
}).listen(3000);
