# Tinfoil Hat

NodeJS module for executing code based on user's *do not track* preferences.

## Usage

**Tinfoil Hat** checks the HTTP request's *do not track* property, and executes callbacks
based on the current setting.
The first argument is required, and is called if the users does NOT wish to be tracked.


```javascript
	var tinfoil = require('./tinfoil');

	var putHatOn = function(data){
		// run code knowing that "do not track"
		// is in effect
	};

	// 'request' is HTTP request object
	tinfoil(putHatOn)(request);
```

To execute code based on *do not track* being disabled, use the second - and optional - callback argument is called if
*do not track* is unset (i.e. the user knowingly or unknowlingly opts to be tracked).

If this callback is not set, then **Tinfoil Hat will** return false to indicate *do not track*
is not active.


```javascript
	var tinfoil = require('./tinfoil');

	var putHatOn = function(data){
		// code will fire when "do not track" is enabled
	};

	var removeHat = function(data){
		// code will fire if "do not track" is not enabled
	}

	// 'request' is HTTP request object
	tinfoil(putHatOn, removeHat)(request);
```
