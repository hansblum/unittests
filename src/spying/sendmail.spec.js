describe('Unit tests for the sendMail function', function() {
	var expect = require('chai').expect;
	var sendmail = require('./sendmail.js');

	describe('Validate the working of the isValidEmailAddress function', function() {

		it('consideres undefined to be an invalid email address', function()  {
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

	describe('When should it, and when should it not, send the message', function() {
		var sinon = require('sinon');

		before(function() {
			this.sendFunction = sinon.spy(sendmail.getMailClient(), 'send');
		});


		it('does not send the message when there is no email address', function() {
			var data = {
				subject: 'Watcha Doing.',
				body: 'O, hi Isabella. We\'re building a roller coaster.'
			}; 
			sendmail.sendMail(data);
			expect(this.sendFunction).not.to.be.called;
		});

		it ('does not send the message when the email address is invalid', function() {
			var data = {
				emailAddress: 'phineas',
				subject: 'Watcha Doing.',
				body: 'We\'re building a roller coaster.'
			}; 
			sendmail.sendMail(data);
			expect(this.sendFunction).not.to.be.called;

		});

		it('does not send the message when there is no subject', function() {
			var data = {
				emailAddress: 'hans.blum@capgemini.com',
				body: 'Hello Hans,\n\n Let\'s have lunch on tuesday.'
			}; 	
			sendmail.sendMail(data);
			expect(this.sendFunction).not.to.be.called;
		});

		it('sends the email when the email address is correct and there is a subject.', function() {
			var data = {
				emailAddress: 'hans.blum@capgemini.com',
				subject: 'Lunch',
				body: 'Hello Hans,\n\n Let\'s have lunch on tuesday.'
			}; 
			sendmail.sendMail(data);
			expect(this.sendFunction).to.be.called;
		});
	});
});