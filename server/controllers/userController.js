const User = require('../models/user');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const key = 'over_my_dead_body_key_secret_key';

exports.test = (req, res) => {
	console.log("Connected!")
	return res.status(200).json({});
}

exports.loginUser = function(req, res) {
	console.log("login user")
	User.findOne({username : req.body.username}, function(err, user) {
		if (user === null) {
			return res.status(400).send({message : "User not found."});
		}

		if (!user.validPassword(req.body.password)) {
			return res.status(400).send({message : "Password is incorrect."});
		}

		const token = jwt.sign({username: req.body.username}, key, {
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

exports.registerUser = function(req, res) {
	User.findOne({username : req.body.username}, function(err, user) {
		if (user !== null) {
			return res.status(400).send({message : "Username taken."});
		}

		let newUser = new User();
		newUser.firstName = req.body.firstName,
		newUser.lastName = req.body.lastName;
		newUser.username = req.body.username;
		newUser.deadline = req.body.date;
		newUser.setPassword(req.body.password);

		newUser.save((err, user) => {
			if (err) {
				return res.status(400).send({message : "Failed to add user."});
			}

			const token = jwt.sign({userId: user._id}, key, {
				algorithm: 'HS256',
				expiresIn: '300 seconds'
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