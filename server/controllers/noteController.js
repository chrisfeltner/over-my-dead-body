const mongoose = require('mongoose');
const Note = require('../models/note');

exports.createNote = function(req, res) {
	let newNote = new Note();

	newNote.userId = req.body.userId;
	newNote.subject = req.body.subject;
	newNote.noteBody = req.body.noteBody;
	newNote.recipients = req.body.recipients;

	newNote.save((err, user) => {
		if (err) {
			return res.status(400).send({message : "Failed to create note."});
		}

		else {
			return res.status(201).send({message : "Successfully created note."});
		}
	});
};

exports.getNotes = function(req, res) {
	Note.find({'userId': req.body.userId}, function (err, doc) {
		if (err) {
			return res.status(400).send({message : "Failed to get notes."});
		}

		else {
			res.status(200).json(doc);
		}
	});
};

exports.editNote = function(req, res) {
	Note.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id),
		{
			$set:{'userId': req.body.userId,
				'subject': req.body.subject,
				'noteBody':req.body.noteBody,
				'recipients':req.body.recipients
			}
		}, function (err, result) {
			if (err) {
				return res.status(400).send({message : "Failed to update note."});
			}

			else {
				return res.status(201).send({message : "Update successful."})
			}
		}

	);
};

exports.deleteNote = function(req, res) {
	Note.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id), function (err) {
		if (err) {
			return res.status(400).send({message : "Failed to delete note."});
		}

		else {
			return res.status(200).send({message : "Successfully deleted note."});
		}
	});
};