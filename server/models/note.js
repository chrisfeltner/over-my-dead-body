var mongoose = require('mongoose');

var NoteSchema = mongoose.Schema({
	userId: String,
	subject: String,
	noteBody: String,
	recipients: [String]
});

module.exports = mongoose.model('Note', NoteSchema);