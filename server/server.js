const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/users');
const noteRoute = require('./routes/notes');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const listeningPort = process.env.PORT || 5000;
const databasePort = process.env.MONGODB_URI || 'mongodb://db-service:27017';

if (databasePort == undefined || databasePort == null) {
  console.log("MONGODB_URI is missing")
  return 1;
} 

const connectWithRetry = () => {
    return mongoose.connect(databasePort, (error) => {
        if(error)
        {
            console.log("Error on initial MongoDB connection. Retrying in 5 sec.");
            setTimeout(connectWithRetry, 5000);
        }
        else {
            console.log("Initial MongoDB connection successful!")
        }
    });
};

connectWithRetry();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoute);
app.use('/notes', noteRoute);

app.post('/refreshToken', function (req, res) {
	const token = jwt.sign({userId: user._id}, key, {
		algorithm: 'HS256',
		expiresIn: '300 seconds'
	});	
	return res.status(201).json(token);
});

app.listen(listeningPort, () => {
	console.log(`Listening on port ${listeningPort}`);
	console.log(`Database is set to port ${databasePort}`);
});
