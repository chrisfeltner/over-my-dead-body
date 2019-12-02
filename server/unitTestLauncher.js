//const server = require('./server');
var Jasmine = require('jasmine');
var jasmine = new Jasmine();
jasmine.loadConfig({
	spec_dir: 'specs',
	spec_files: [
        'loginSpec.js',
		'noteSpec.js'
	]
});

jasmine.onComplete(function(passed) {
    if(passed) {
        console.log('All specs have passed');
    }
    else {
        console.log('At least one spec has failed');
    }
});

jasmine.execute();