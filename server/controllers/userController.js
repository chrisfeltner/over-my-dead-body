const User = require('../models/user');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const scheduler = require('../schedule');
const key = 'over_my_dead_body_key_secret_key';

exports.loginUser = function(req, res) {
	console.log("login user")
	User.findOne({username : req.body.username}, function(err, user) {
		if (user === null) {
			return res.status(400).send({message : "User not found."});
		}

		if (!user.validPassword(req.body.password)) {
			return res.status(400).send({message : "Password is incorrect."});
		}

		const token = jwt.sign({userId: user._id}, key, {
			algorithm: 'HS256',
			expiresIn: '1800 seconds'
		});

		const refresh_token = uuidv4();
		res.cookie('refresh_token', refresh_token, {
			maxAge: 60 * 24 * 30 * 60 * 1000,
			httpOnly:true,
			secure: false
		});
			
		return res.status(201).json({token: token, deadline: user.deadline});
	});
};

exports.logoutUser = function(req, res) {
	res.cookie('refresh_token', "", {
    httpOnly: true,
    expires: new Date(0)
  }).status(200).send("Logged out");
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
				expiresIn: '1800 seconds'
			});

			const refresh_token = uuidv4();
			res.cookie('refresh_token', refresh_token, {
				maxAge: 60 * 24 * 30 * 60 * 1000,
				httpOnly:true,
				secure: false
			});

			return res.status(201).json({token: token, deadline: user.deadline});
		});
	});
};

exports.editUser = function(req, res) {
	User.findById(req.userId, function (err, result) {
		if (err) {
			return res.status(400).send({message : "Failed to get user."});
		}
    
    if (!result) {
			return res.status(200).json({message : "This account does not exist."});
		}

		if (!result.validPassword(req.body.password)) {
			result.setPassword(req.body.password);
		}
    
		result.firstName = req.body.firstName;
		result.lastName = req.body.lastName;
		result.userName = req.body.username;
		result.deadline = req.body.deadline;
		result.save(function(err) {
			if (err) {
				return res.status(400).send({message : "Failed to update user."})
			}

			return res.status(201).send({message : "Update successful."})

		});
	});
};

exports.getUser = function(req, res) {
	User.findById(req.userId, 'firstName lastName username deadline ', function(err, user) {
		if (err)
			return res.status(400).send({message : "Failed to get user."});

		if (!user) {
			return res.status(200).json({message : "This account does not exist."});
		}
		return res.status(200).json(user);
	});
};

exports.confirmLife = function(req, res) {
	User.findByIdAndUpdate(req.userId,
		{
			$set:{
				'deadline':req.body.deadline
			}
		}, { useFindAndModify: false, new: true}, function (err, result) {
			if (err) {
				return res.status(400).send({message : "Could not confirm life."});
			}

			if (!result) {
				return res.status(200).json({message : "This account does not exist."});
			}

			return res.status(201).json({newDeadline : result.deadline});
		}
	);
};
