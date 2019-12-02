const request = require('request');

var registerOptions = {
	url: 'https://www.overmydeadbody.tech/users/register',
	body: {
		"firstname":"Rick",
		"lastname":"Sanchez",
		"username":"blipsAndChitz85",
		"password":"plumbus",
		"deadline":"2019-11-30T12:01Z"
	},
	json:true
};

var loginOptions = {
	url: 'https://www.overmydeadbody.tech/users/login',
	body: {
		"username":"testUser",
		"password":"testPassword"
	},
	json:true
}

describe("register user success", function() {
	describe("POST /users/register", function() {
		it("returns status of 201", function(done) {
			request.post(registerOptions, function(error, response, body) {
				expect(response.statusCode).toBe(201);
				done();
			});
		});	
	});
});

describe("login user success", function() {
	describe("POST /users/login", function() {
		it("returns status of 200", function(done) {
			request.post(loginOptions, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	});
});

loginOptionsWithWrongUsername = {
	url: 'https://www.overmydeadbody.tech/users/login',
	body: {
		"username":"wrongUsername",
		"password":"testPassword"
	},
	json:true
};

describe("login with wrong username", function() {
	describe("POST /users/login", function() {
		it("returns status of 400", function(done) {
			request.post(loginOptionsWithWrongUsername, function (error, response, body) {
				expect(response.statusCode).toBe(400);
				done();
			});
		});
	});
});

loginOptionsWithWrongPassword = {
	url: 'https://www.overmydeadbody.tech/users/login',
	body: {
		"username":"testUser",
		"password":"wrongPassword"
	},
	json:true
};

describe("login with wrong password", function() {
	describe("POST /users/login", function() {
		it("returns status of 400", function(done) {
			request.post(loginOptionsWithWrongPassword, function (error, response, body) {
				expect(response.statusCode).toBe(400);
				done();
			});
		});
	});
});