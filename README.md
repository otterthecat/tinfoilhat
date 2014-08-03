# Tinfoil Hat

NodeJS module for executing code based on user's *do not track* preferences.

## Usage

### Standalone

**Tinfoil Hat** checks the HTTP request's *do not track* property, and executes callbacks
based on the current setting.
The first argument is required, and is called if the users does NOT wish to be tracked.


```javascript
	var tinfoilhat = require('./tinfoilhat');

	var putHatOn = function(request, response){
		// run code knowing that "do not track"
		// is in effect
	};

	// pass the HTTP request & response to the returned callback
	tinfoilhat(putHatOn)(req, res);
```

To execute code based on *do not track* being disabled, use the second - and optional - callback argument is called if
*do not track* is unset (i.e. the user knowingly or unknowlingly opts to be tracked).

If this callback is not set, then **Tinfoil Hat will** return false to indicate *do not track*
is not active.


```javascript
	var tinfoilhat = require('./tinfoilhat');

	var putHatOn = function(request, response){
		// code will fire when "do not track" is enabled
	};

	var removeHat = function(request, response){
		// code will fire if "do not track" is not enabled
	}

	// pass the HTTP request & response to the returned callback
	tinfoilhat(putHatOn, removeHat)(req, res);
```

### Middleware

If you're using Connect, Express, or something similar, **Tinfoil Hat** can also be used a middleware layer
in your application. To use it in this fashion, you do not manually pass the request & response object, as
this will be handled by the app instead:

```javascript
/* app's dependencies & and set up here */

// following 2 functions are user defined
// callbacks - example somewhat trivialized
// for brevity
var whenDntOn = function (req, res) {
	req.tinfoilhat = " * ON *";
};

var whenDntOff = function (req, res) {
	req.tinfoilhat = " - off -";
};

var app = connect();

// note that here we are not manually passing
// the request or response objects. The app will
// do that for you
app.use(tinfoilhat(whenDntOn, whenDntOff));

/* more middleware as you see fit */

http.createServer(app).listen(3000);

```

## Run Tests
From within the root directory, open a terminal and run:
```javascript
npm install
npm test
```
