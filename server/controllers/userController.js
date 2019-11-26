const User = require('../models/user');

exports.loginUser = function(req, res) {
	User.findOne({username : req.body.username}, function(err, user) {
		if (user === null) {
			return res.status(400).send({message : "User not found."});
		}

		else {
			if (user.validPassword(req.body.password)) {
				return res.status(200).send({message : "Login successful."});
			}

			else {
				return res.status(400).send({message : "Password is incorrect."})
			}
		}
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

			else {
				return res.status(201).send({message : "Successfully added user."});
			}
		});
	});
};