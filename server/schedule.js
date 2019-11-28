const userController = require('./controllers/userController');
const Note = require('./models/note');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.checkForDeceasedUsers = function() {
	userController.getPassedDeadlines(function(docs) {
		sendEmails(docs);
	});
};

sendEmails = async function(usersWithDeadlines) {
	var i;
	var j;
	var k;
	emails = [];

	for (i = 0; i < usersWithDeadlines.length; i++) {
		notes = await Note.find({'userId': usersWithDeadlines[i]._id});

		for (j = 0; j < notes.length; j++) {

			for (k = 0; k < notes[j].recipients.length; k++) {
				email = {
					to: notes[j].recipients[k],
					from: usersWithDeadlines[i].username,
					subject: notes[j].subject,
					text: notes[j].noteBody
				};

				emails.push(email);
			}
		}
	}

	sgMail.send(emails);
};