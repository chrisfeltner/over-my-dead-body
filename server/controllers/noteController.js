const jwt = require('jsonwebtoken');
const Note = require('../models/note');

const key = 'over_my_dead_body_key_secret_key';

exports.authenticate = function(req, res, next) {
	var payload;
	var token = req.headers['Authorization'];
	
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	try {
		payload = jwt.verify(token, key);
		req.userId = payload.userId;
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send({message : "Unauthorized user."});
		}

		return res.status(400).end();
	}

	next();
}

exports.createNote = function(req, res) {
	let newNote = new Note();

	newNote.userId = req.userId;
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
	Note.find({'userId': req.userId}, function (err, doc) {
		if (err) {
			return res.status(400).send({message : "Failed to get notes."});
		}

		else {
			res.status(200).json(doc);
		}
	});
};

exports.editNote = function(req, res) {
	Note.findByIdAndUpdate(req.body._id,
		{
			$set:{'userId': req.userId,
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
	Note.findByIdAndDelete(req.body._id, function (err) {
		if (err) {
			return res.status(400).send({message : "Failed to delete note."});
		}

		else {
			return res.status(200).send({message : "Successfully deleted note."});
		}
	});
};