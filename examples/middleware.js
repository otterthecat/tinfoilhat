// This example will need you to run
// npm install in the root directory first,
// as this is depnedent on Connect (as obviously required below)

var connect = require('connect');
var http = require('http');
var tinfoilhat = require('../index');

// callback for if user does not wish to be tracked
var whenDntOn = function (req, res) {
	req.tinfoilhat = " * ON *";
};

// callback if the user doesn't care, or wishes to be tracked
var whenDntOff = function (req, res) {
	req.tinfoilhat = " - off -";
};

// extra middleware to output to page
// *NOT* needed for tinfoilhat to work, but helps
// to illustrate this example.
var last = function(req, res){
	res.writeHead(200, {contentType : 'text/plain'});
	res.end("Your DNT settings are " + req.tinfoilhat);
}

// start connect and add the middleware
var app = connect();
// notice that you do not manually pass the request/response
// objects there, as the app will do so for you
app.use(tinfoilhat(whenDntOn, whenDntOff));
app.use(last);

http.createServer(app).listen(3000);
