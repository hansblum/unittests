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

	describe('', function() {
		var mock = require('mock-require');
		var mailSent = false;
		var sinon = require('sinon');
		var mockMailClient = sinon.mock()

		beforeEach(function() {
			mailSent = false;
		});

		it('does not send the message when there is no email address', function() {
			var data = {
				subject: 'Watcha Doing.',
				body: 'We\'re building a roller coaster.'
			}; 
			sendmail.sendMail(data);
			expect(mailSent).not.to.be.ok;
		});

		it('does not send the message when there is no subject', function() {
			var data = {
				emailAddress: 'hansje@familieknots.nl',
				body: 'Hallo Hansje'
			}; 
			sendmail.sendMail(data);
			expect(mailSent).not.to.be.ok;
		});

		it('sends the email', function() {
			var data = {
				emailAddress: 'onkel.x@familieknots.nl',
				subject: 'Lunch',
				body: 'Dear Onkel X,\n Let\'s have lunch on tuesday.'
			}; 
			sendmail.sendMail(data);
			expect(mailSent).to.be.ok;
		});
	});
});