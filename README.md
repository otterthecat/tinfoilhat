# Tinfoil Hat

NodeJS module for executing code based on user's "DO NOT TRACK" preferences.

Browserify compatible.


## Usage

Tinfoil Hat can be used either on the server or the client (via Browserify).
The first argument is required, and is called if the users does NOT wish to be tracked.

```javascript
	var tinfoil = require('./tinfoil');

	var putHatOn = function(data){
		// run code knowing that DO NOT TRACK
		// is in effect
	};

	tinfoil(putHatOn)(request);

	// 'request' is HTTP request object, or optionally
	// a browser's 'navigator' object.
```
If the user has not activated DO NOT TRACK, then the callback will not be called.

To execute code based on DO NOT TRACK being disabled, use the second - and optional - callback argument is called if DO NOT TRACK is unset (i.e. the user knowingly or unknowlingly opts to be tracked).

```javascript
	var tinfoil = require('./tinfoil');

	var putHatOn = function(data){
		// code will fire when DO NOT TRACK is enabled
	};

	var removeHat = function(data){
		// code will fire if DO NOT TRACK is not enabled
	}

	tinfoil(putHatOn, removeHat)(request);

	// 'request' is HTTP request object, or optionally
	// a browser's 'navigator' object.
```
