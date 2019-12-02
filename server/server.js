const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const scheduler = require('./schedule');
const auth = require('./auth');
const userRoute = require('./routes/users');
const noteRoute = require('./routes/notes');
const userController = require('./controllers/userController');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const path = require('path');

const listeningPort = process.env.PORT || 5000;
const databasePort = process.env.MONGODB_URI || 'mongodb://db-service:27017';

if (databasePort == undefined || databasePort == null) {
  console.log("MONGODB_URI is missing")
  return 1;
} 

const connectWithRetry = () => {
    if(process.env.COSMOSDB_HOST) {
            console.log(process.env.COSMOSDB_HOST)
            return mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
                useNewUrlParser: true,
                auth: {
                  user: process.env.COSMODDB_USER,
                  password: process.env.COSMOSDB_PASSWORD
                }
              })
            .then(() => console.log('Connection to CosmosDB successful'))
            .catch((err) => console.error(err));
    }
    else {
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
    }
};

connectWithRetry();

const app = express();

app.use(cors({origin: ['http://localhost:3000', 'http://frontend-service:3000'], credentials: true}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend-web/build")))
app.use('/users', userRoute);
app.use('/notes', noteRoute);
  
app.get('/ping', function (req, res) {
    return res.status(200).send("pong");
  });

app.get('/', (req, res) => { 
    return res.sendFile(path.join(__dirname, "../frontend-web/build", "index.html"))
})

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

	return res.status(200).json({token: token});
});

app.get('/checkDeadlines', function (req, res) {
	scheduler.checkForDeceasedUsers();
	return res.status(200).end();
});

setInterval(scheduler.checkForDeceasedUsers, 3600000, () => {
	return res.status(201).json(token);
});

var server = app.listen(listeningPort, () => {
	console.log(`Listening on port ${listeningPort}`);
	console.log(`Database is set to port ${databasePort}`);
});

exports.closeServer = function() {
	server.close();
};
