module.exports = {
	MailClient : MailClient
};

function MailClient() {
	var FATAL = -1;
	var ERROR = 0;
	var WARN = 1;
	var INFO = 2;
	var DEBUG = 3;
	var TRACE = 4;


	this.send = _send;
	this.log = _log;
	this.log_level = WARN;

	function _send (data) {
	    this.log(INFO, 'This function an not be included in a unit test because it depends on a service that might not be available.');
    }

    function _log(level, message) {
    	if (level < this.log_level) {
    		console.log (message);
    	}
    }
    
}

