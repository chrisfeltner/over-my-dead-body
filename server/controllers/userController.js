const User = require('../models/user');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const scheduler = require('../schedule');

const key = 'over_my_dead_body_key_secret_key';

exports.authenticate = function(req, res, next) {
	var payload;
	var token = req.headers['authorization'];

	if(token === undefined)
	{
		return res.status(400).send({message: "Unauthorized user. No bearer token."});
	}
	
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

exports.loginUser = function(req, res) {
	User.findOne({username : req.body.username}, function(err, user) {
		if (user === null) {
			return res.status(400).send({message : "User not found."});
		}

		if (!user.validPassword(req.body.password)) {
			return res.status(400).send({message : "Password is incorrect."});
		}

		const token = jwt.sign({userId: user._id}, key, {
			algorithm: 'HS256',
			expiresIn: '1000 seconds'
		});

		const refresh_token = uuidv4();
		res.cookie('refresh_token', refresh_token, {
			maxAge: 60 * 24 * 30 * 60 * 1000,
			httpOnly:true,
			secure: false
		});
			
		return res.status(200).json(token);
	});
};

exports.logoutUser = function(req, res) {
	res.cookie('refresh_token', "", {
    httpOnly: true,
    expires: new Date(0)
  });
}

exports.registerUser = function(req, res) {
	User.findOne({username : req.body.username}, function(err, user) {
		if (user !== null) {
			return res.status(400).send({message : "Username taken."});
		}

		let newUser = new User();
		newUser.firstName = req.body.firstName,
		newUser.lastName = req.body.lastName;
		newUser.username = req.body.username;
		newUser.deadline = req.body.deadline;
		newUser.setPassword(req.body.password);

		newUser.save((err, user) => {
			if (err) {
				return res.status(400).send({message : "Failed to add user."});
			}

			const token = jwt.sign({userId: user._id}, key, {
				algorithm: 'HS256',
				expiresIn: '1000 seconds'
			});

			const refresh_token = uuidv4();
			res.cookie('refresh_token', refresh_token, {
				maxAge: 60 * 24 * 30 * 60 * 1000,
				httpOnly:true,
				secure: false
			});

			return res.status(201).json(token);
		});
	});
};

exports.getUser = function(req, res) {
	User.findById(req.userId, function(err, user) {
		if (err)
			return res.status(400).send({message : "Failed to get user."});

		else {
			return res.status(200).json(user);
		}
	});
};

exports.confirmLife = function(req, res) {
	User.findByIdAndUpdate(req.userId,
		{
			$set:{
				'deadline':req.body.deadline
			}
		}, function (err, result) {
			if (err) {
				return res.status(400).send({message : "Could not confirm life."});
			}

			else {
				return res.status(201).json({newDeadline : result.deadline});
			}
		}

	);
};

exports.checkDeadlines = function(req, res) {
	scheduler.checkForDeceasedUsers();
	return res.end();
}