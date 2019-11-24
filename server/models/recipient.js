var mongoose = require('mongoose');

var RecipientSchema = mongoose.Schema({
	noteID: String,
	email: String
});

module.exports = mongoose.model('Recipient', RecipientSchema);