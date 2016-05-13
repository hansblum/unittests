# UNIT TESTING

##What is a unit test

A unit test is a set of tests that you use to test one unit of code. What exactly is a unit of code?
That is flexible here; it can be a function, a class or maybe an angular controller, directive or service.
Usually you develop in such a way that the unit of code is in one JavaScript file. 

A very basic example of a unit test using mocha

hello.js
```
	function sayHello() {
		return '';		
	}
```
hello.spec.js
```
	var expect = chai.expect;

	describe('Simple hello test', function() {
		it('Says hello', function() {
			expect(sayHello()).to.equal('Hello');	
		});
	});
```
Now execute 'gulp test' to execute the test.
```
    D:\POLAR\workspaces\polar>gulp mocha
    [09:01:41] Using gulpfile D:\POLAR\workspaces\polar\gulpfile.js
    [09:01:41] Starting 'mocha'...
     	-> running 1 suite
     	   Simple hello test
         Says hello.. fail
    1:       expected '' to equal 'Hello'
     	-> reporting 1 failure
 
    1:    Simple hello test Says hello
   
    expected '' to equal 'Hello'
   	         at Context.<anonymous> (D:\POLAR\workspaces\polar\test\server\examples\	sayhello.test.js:9:25)
    -  Hello
       "-----"
    +
    
    -> failed 1 and passed 0 of 1 test (13ms)
     
    [09:01:41] 'mocha' errored after 134 ms
    [09:01:41] Error in plugin 'gulp-mocha'
    Message:
       1 test failed.
```

Oops. The test fails, because the function sayHello says '' and that is not equal to 'Hello'. That's easy to fix: 

```
	function sayHello() {
		return 'Hello';		
	}

	var expect = require('chai').expect;

	describe('Simple hello test', function() {
		it('Says hello', function() {
			expect(sayHello()).to.equal('Hello');	
		});
	});
```

Execute gulp mocha again and the test passes: 

```
    D:\POLAR\workspaces\polar>gulp mocha
    [09:03:34] Using gulpfile D:\POLAR\workspaces\polar\gulpfile.js
    [09:03:34] Starting 'mocha'...
   
   	-> running 1 suite
   
   	   Simple hello test
   	      Says hello.. ok
   
   	-> passed 1 of 1 test (16ms)
   
   	[09:03:34] Finished 'mocha' after 115 ms
```

Independence
------------------

It is important that a unit test is independent of environmental issues, connections and order of execution. This is because the unit tests will be executed many times, and every time that a unit test fails, someone has to investigate what is wrong.

Imagine this javascript function, that sends an email after checking email address and subject: 

```
(function () {
	module.exports = { sendMail : sendMail, 
					   isValidEmailAddress: isValidEmailAddress, 
					   getMailClient: getMailClient };

	var client = require('./mailclient.js');
	var mailclient = new client.MailClient();

	var config = {
		from : 'noreply@capgemini.com'
	}

	/**
	 * sendMail checks subject and emailaddress before it sends the mail.
	 * 
	 * @param {object} an object containing a emailAddress, a subject and optionally, a body.
	 */
	function sendMail(data) {
		if (data && data.emailAddress && data.subject) {
			if (isValidEmailAddress(data.emailAddress)) {
				mailclient.send({
					to : data.emailAddress,
					from: config.from,
					subject: data.subject,
					body: data.body
				});
			}
		}
	}

	function isValidEmailAddress(emailAddress) {
		var regex = /^[a-z0-9\-_]+(\.[a-z0-9\-_]+)*@[a-z0-9\-\_]+(\.[a-z0-9\-\_]+)*$/;
		return regex.test(emailAddress);
	}

	function getMailClient() {
		return mailclient;
	}

})();
```

There are two functions to test here, `isValidEmailAddress` and `sendMail`. The isValidEmailAddress can be easily tested: 

```
var expect = require('chai').expect;
var sendmail = require('./sendmail.js');

describe('Validate the working of the isValidEmailAddress function', function() {

	it('consideres \'undefined\' not to be a valid email address', function()  {
		expect(sendmail.isValidEmailAddress()).not.to.be.ok;
	});

	it('rejects empty string email address', function() {
		expect(sendmail.isValidEmailAddress('')).not.to.be.ok;
	}); 

	it ('confirms that \'a@bc.de\' is a valid email address', function() {
		expect(sendmail.isValidEmailAddress('a@bc.de')).to.be.ok;
	});

	it ('rejects an email address with multiple @', function() {
		expect(sendmail.isValidEmailAddress('a@b@c.de')).not.to.be.ok;
	});
});
```
    $gulp test
    [09:08:28] Using gulpfile d:\POLAR\workspaces\unittests\gulpfile.js
    [09:08:28] Starting 'test'...
    
    Validate the working of the isValidEmailAddress function
      √ consideres 'undefined' to be an invalid email address
      √ rejects empty string email address
      √ confirms that 'a@bc.de' is a valid email address
      √ rejects an email address with multiple @

### Mocks and spies

The sendMail function requires a different approach. It uses a third party mailclient library, we don't need to test. We also don't want to send an actual email every time the test is run.

We can solve that problem by overwriting the 'send' function in the mailclient. One of the possibilities to do that is to crate a spy with [`sinon`](http://www.sinonjs.org):

```
describe('When should it, and when should it not, send the message', function() {
	var sinon = require('sinon');
	var sendFunction;

	before(function() {
		this.sendFunction = sinon.spy(sendmail.getMailClient(), 'send');
	});
});
```

Now we can test whether the mailclient.send method is called with
```
    expect(this.sendFunction).to.be.called;
    expect(this.sendFunction).not.to.be.called;
```

```
describe('When should it, and when should it not, send the message', function() {
	var sinon = require('sinon');
	var sendFunction;

	before(function() {
		this.sendFunction = sinon.spy(sendmail.getMailClient(), 'send');
	});

	it('does not send the message when there is no email address', function() {
		var data = {
			subject: 'Watcha doing?',
			body: 'We\'re building a roller coaster.'
		}; 
		sendmail.sendMail(data);
		expect(this.sendFunction).not.to.be.called;
	});

	it ('does not send the message when the email address is invalid', function() {
		var data = {
			emailAddress: 'phineas',
			subject: 'Watcha doing?', 
			body: 'We're building a roller coaster.'
		}
		sendmail.sendMail(data);
		expect(this.sendFunction).not.to.be.called;
	});

	it('does not send the message when there is no subject', function() {
		var data = {
			emailAddress: 'hans.blum@capgemini.com',
			body: 'Hallo Hans'
		}; 
		sendmail.sendMail(data);
		expect(this.sendFunction).not.to.be.called;
	});

	it('sends the email when the email address is correct and there is a subject.', function() {
		var data = {
			emailAddress: 'hans.blum@capgemini.com',
			subject: 'Lunch',
			body: 'Hello Hans, \n\nLet's have lunch on Tuesday.'
		}; 
		sendmail.sendMail(data);
		expect(this.sendFunction).to.be.called;
	});
});
```
    $gulp test
    [09:08:28] Using gulpfile d:\POLAR\workspaces\unittests\gulpfile.js
    [09:08:28] Starting 'test'...
    
    When should it, and when should it not, send the message
        √ does not send the message when there is no email address
        √ does not send the message when the email address is invalid
        √ does not send the message when there is no subject
        √ sends the email when the email address is correct and there is a subject.


Coverage
------------



