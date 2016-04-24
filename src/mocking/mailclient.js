module.exports = {
	MailClient : MailClient
};

function MailClient() {

	this.send = _send;

	function _send (data) {
	    doNothing('This function an not be included in a unit test because it depends on a service that might not be available.');
    }

    function doNothing(message) {
    	return message;
    }
    
}

