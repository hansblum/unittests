describe('Say Hello unit tests', function() {
	var expect=require('chai').expect;
	var hello=require('./hello.js');
	it('Says Hello', function() {
		expect(hello.sayHello()).to.equal('Hello');
	});
});