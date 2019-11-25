const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const noteRoute = require('./routes/notes');

const listeningPort = process.env.PORT || 5000;
const databasePort = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(databasePort);

if (databasePort == undefined || databasePort == null) {
  console.log("MONGODB_URI is missing")
  return 1;
} 

const app = express();

app.use(express.json());
app.use('/users', userRoute);
app.use('/notes', noteRoute);

app.listen(listeningPort, () => {
	console.log(`Listening on port ${listeningPort}`);
	console.log(`Database is set to port ${databasePort}`);
});