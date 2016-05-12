module.exports = {
	MovieNightApi : MovieNightApi
};

function MovieNightApi(movieNight) {
	'use strict';

	require('./movienight-model.js');

	var self = this;
	self.movieNight = movieNight; 
	self.addMovieNight = _addMovieNight;
	self.isValidMovieNight = _isValidMovieNight;
	self.storeMovieNight = _storeMovieNight;

	function _addMovieNight() {
		if (self.isValidMovieNight()) {
			self.storeMovieNight()
		}
	}

	function _isValidMovieNight() {
		var result = false;
		if (movieNight && movieNight.movieTitle) {
			result = _isValidDate(movieNight.date);	
		}
		return result;
	}

	function _isValidDate(date) {
		var result = false;
		if (date && typeof date === 'string') {
			var nDate = Date.parse(date);
			console.log('', date, ' is ', nDate); 
			result = (nDate !== NaN);
		}
		return result;
	}

	function _storeMovieNight() {
		console.log('Do whatever is needed to store the movieNight document');
	}
}