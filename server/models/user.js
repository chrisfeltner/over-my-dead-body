var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	deadline: Date,
	hash: String,
	salt: String
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
}

module.exports = mongoose.model('User', UserSchema);