const request = require('request');
const jwt = require('jsonwebtoken');

const token = jwt.sign({userId:'5de37f0f44e5cf004cb32173'}, 'over_my_dead_body_key_secret_key', {
			algorithm: 'HS256',
			expiresIn: '5 minutes'
});

var createNoteOptions = {
	url: 'https://www.overmydeadbody.tech/notes/createNote',
	method: 'POST',
	headers: {
		'Authorization': `Bearer ${token}`
	},

	body: {
		"subject":"testSubject",
		"noteBody":"testBody",
		"recipients":["testEmail@gmail.com"]
	},
	json: true
};

var editNoteOptions = {
	url: 'https://www.overmydeadbody.tech/notes/setNote',
	method: 'POST',
	headers: {
		'Authorization': `Bearer ${token}`
	},

	body: {
		"_id":"5de4386dc34fcc004bd978d7",
		"subject": "testSubjectEdit",
		"noteBody":"testBodyEdit",
		"recipients":["testEmailEdit@gmail.com"]
	},
	json: true
};

var deleteNoteOptions = {
	url: 'https://www.overmydeadbody.tech/notes/deleteNote',
	method: 'DELETE',
	headers: {
		'Authorization': `Bearer ${token}`
	},

	body: {
		"_id": "5de4386dc34fcc004bd978d7",
	},
	json: true
};

var getNoteOptions = {
	url: 'https://www.overmydeadbody.tech/notes/getNotes',
	method: 'GET',
	headers: {
		'Authorization': `Bearer ${token}`
	}
};

describe("creating a note", function() {
	describe("POST /notes/createNote", function() {
		it("returns status code 201", function(done) {
			request.post(createNoteOptions, function(error, response, body) {
				expect(response.statusCode).toBe(201);
				done();
			});
		});
	});
});

describe("editing a note", function() {
	describe("POST /notes/setNote", function() {
		it("returns status code 201", function(done) {
			request.post(editNoteOptions, function(error, response, body) {
				expect(response.statusCode).toBe(201);
				done();
			});
		});
	});
});

describe("deleting a note", function() {
	describe("DELETE /notes/deleteNote", function() {
		it("returns status code 200", function(done) {
			request.delete(deleteNoteOptions, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	});
});

describe("getting all the notes", function() {
	describe("GET /notes/getNotes", function() {
		it("returns status code 200", function(done) {
			request.get(getNoteOptions, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	});
});