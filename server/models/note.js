var mongoose = require('mongoose');

var NoteSchema = mongoose.Schema({
	userID: String,
	subject: String,
	body: String
});

module.exports = mongoose.model('Note', NoteSchema);