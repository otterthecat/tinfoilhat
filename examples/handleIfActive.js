var http = require('http');
var tinfoil = require('../index');

// function to handle if DNT is active [required]
var handleDntActive = function (request, response) {
	'use strict';
	response.end('DNT is ACTIVE');
};

http.createServer(function (req, res) {
	'use strict';

	res.writeHead(200, {contentType : 'text/plain'});

	// tinfoil calls handleDntActive if the request indicates
	// dnt is active. When called, it will be passed
	// the HTTP request & response.
	tinfoil(handleDntActive)(req, res);

	// current code lets handleDntActive close the response
	// if dnt is off, handleDntActive won't fire, and
	// the following line will close the response instead
	res.end('if you see this, dnt is off');
}).listen(3000);
