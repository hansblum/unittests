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
