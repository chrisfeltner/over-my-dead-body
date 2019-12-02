const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const scheduler = require('./schedule');
const auth = require('./auth');
const userRoute = require('./routes/users');
const noteRoute = require('./routes/notes');
const userController = require('./controllers/userController');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const listeningPort = process.env.PORT || 5000;
const databasePort = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(databasePort);

if (databasePort == undefined || databasePort == null) {
  console.log("MONGODB_URI is missing")
  return 1;
} 

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoute);
app.use('/notes', noteRoute);

app.get('/refreshToken', auth.authenticateWithoutExpiration, function (req, res) {
	const new_refresh_token = uuidv4();
	const token = jwt.sign({userId: req.userId}, 'over_my_dead_body_key_secret_key', {
		algorithm: 'HS256',
		expiresIn: '1800 seconds'
	});	

	res.cookie('refresh_token', new_refresh_token, {
		maxAge: 60 * 24 * 30 * 60 * 1000,
		httpOnly:true,
		secure: false
	});

	return res.status(201).json({token: token});
});

app.get('/checkDeadlines', function (req, res) {
	scheduler.checkForDeceasedUsers();
	return res.end();
});

setInterval(scheduler.checkForDeceasedUsers, 3600000);

var server = app.listen(listeningPort, () => {
	console.log(`Listening on port ${listeningPort}`);
	console.log(`Database is set to port ${databasePort}`);
});

exports.closeServer = function() {
	server.close();
};