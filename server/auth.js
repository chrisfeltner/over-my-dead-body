const jwt = require('jsonwebtoken');
const key = 'over_my_dead_body_key_secret_key';

exports.authenticateWithExpiration = function(req, res, next) {
	var payload;
	var token = req.headers['authorization'];
	
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	try {
		payload = jwt.verify(token, key);
		req.userId = payload.userId;
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send({message : "Unauthorized user."});
		}

		return res.status(400).end();
	}

	next();
};

exports.authenticateWithoutExpiration = function(req, res, next) {
	var payload;
	var token = req.headers['authorization'];
	
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	try {
		payload = jwt.verify(token, key, {ignoreExpiration: true});
		req.userId = payload.userId;
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send({message : "Unauthorized user."});
		}

		return res.status(400).end();
	}

	next();
};