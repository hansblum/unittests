describe('Hello World multilanguage test', function() {
	var expect = require('chai').expect,
		helloworld = require('./helloworld.js');

	it('gives \'Hallo wereld\' when the language is \'nl\'', function() {
		expect(helloworld.helloWorld('nl')).to.equal('Hallo wereld!');
	});

	it('gives \'¡Hola mundo!\' when the language is \'es\'.', function() {
		expect(helloworld.helloWorld('es')).to.equal('¡Hola mundo!');
	});

	it('gives \'Hello world!\' when the language is \'en\'.', function() {
		expect(helloworld.helloWorld('en')).to.equal('Hello world!');
	});
	it('gives \'Hello world!\' when no language given.', function() {
		expect(helloworld.helloWorld()).to.equal('Hello world!');
	});
	it('gives \'Hello world!\' when unknown language given.', function() {
		expect(helloworld.helloWorld('po')).to.equal('Hello world!');
	});

})