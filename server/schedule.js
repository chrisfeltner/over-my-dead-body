const User = require('./models/user');
const Note = require('./models/note');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

exports.checkForDeceasedUsers = function() {
	currentDate = new Date();
	User.find({'deadline' : {$lt : currentDate}}, '_id username firstName lastName', function(err, doc) {
		sendEmails(doc);
	});	
};

sendEmails = async function(usersWithDeadlines) {
	var i;
	var j;
	var k;
	emails = [];

	try {

		for (i = 0; i < usersWithDeadlines.length; i++) {
			notes = await Note.find({'userId': usersWithDeadlines[i]._id});
			console.log(notes);

			for (j = 0; j < notes.length; j++) {

				for (k = 0; k < notes[j].recipients.length; k++) {
					email = {
						to: notes[j].recipients[k],
						from: 'mail@overmydeadbody.tech',
						subject: notes[j].subject,
						text: `This is a pre-written, scheduled message from ${usersWithDeadlines[i].firstName} ${usersWithDeadlines[i].lastName} sent by Over My Dead Body messaging service. Find out more at www.overmydeadbody.tech\n\n
								${notes[j].noteBody}`
					};

					emails.push(email);
				}
				await Note.findByIdAndDelete(notes[j]._id);
			}
			await User.findByIdAndDelete(usersWithDeadlines[i]._id);
		}
	} catch (e) {
		console.log(e);
	}
	console.log('sending emails');
	sgMail.send(emails);
};