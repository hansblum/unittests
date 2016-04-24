module.exports = {
	MailClient : MailClient
};

function MailClient() {

	function sendMail(data) {
	    console.log('This function should not be included in a unit test because it is very slow. And has dependencies on connections');
    }	
    
}

