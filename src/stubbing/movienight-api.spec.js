(function() {
	'use strict';
	var api = require('./movienight-api.js');
	var expect = require('chai').expect;
	var sinon = require('sinon');

	describe('MovieNightApi constructor', function() {
		it("creates a MovieNightApi object", function() {
			var movieNightApi = new api.MovieNightApi();
			expect(movieNightApi).not.to.be.null;
		});

		it("creates a MovieNightApi with a movieNight object", function() {
			var movieNightApi = api.MovieNightApi({ 
				date: '2016-05-05', 
				movieTitle: 'The Blues Brothers'
			});
			expect(movieNightApi).not.to.be.null;
		});
	});

	describe("MovieNightApi validation of movieNight object", function() {
		var movieNight;
		it("considers a movieNight object without a title to be invalid", function() {
			movieNight = {
				date: '2016-05-05'
			};
			expect(new api.MovieNightApi(movieNight).isValidMovieNight()).to.be.falsy;
		});

		it("Considers a movieNight object with empty movieTitle to be invalid", function() {
			movieNight = {
				date: '2016-05-05',
				movieTitle: ''
			};
			expect(new api.MovieNightApi(movieNight).isValidMovieNight()).to.be.falsy;
		});

		it("considers a movieNight without a date to be invalid", function() {
			movieNight = {
				movieTitle: 'Batman Begins'
			};
			expect(new api.MovieNightApi(movieNight).isValidMovieNight()).to.be.falsy;
		});

		it("considers a movieNight with an invalid date to be invalid.", function(){
			movieNight = {
				date: 'xxxx-xx-xx',
				movieTitle: 'The Dark Knight'
			};
			expect(new api.MovieNightApi(movieNight).isValidMovieNight()).to.be.falsy;
		});

		it("considers a movieNight with a valid date and a title to be valid", function() {
			movieNight = {
				date: '2016-05-05',
				movieTitle: 'The Sound of Music'
			};
			expect(new api.MovieNightApi(movieNight).isValidMovieNight()).to.be.truthy;
		});

	});


	describe("MovieNightApi would store only valid movie night objects", 
		function() {
			var movieNightIsValid = false;
			var movieNight = {
				date: '2016-02-29',
				movieTitle: 'Somethings gonna happen on a Tuesday night'
			}
			var movieNightApi;
			beforeEach(function() {
				movieNightApi = new api.MovieNightApi(movieNight);
				sinon.stub(movieNightApi, "isValidMovieNight", function() {
					return movieNightIsValid;
				});
				movieNightApi.createMovieNight = sinon.spy();
			});

			it('would not store an invalid movie night', function() {
				movieNightIsValid = false;
				movieNightApi.addMovieNight();
				expect(movieNightApi.createMovieNight).not.to.be.called;
			});

			it('stores a valid movie night', function() {
				movieNightIsValid = true;
				movieNightApi.addMovieNight();
				expect(movieNightApi.createMovieNight).to.be.called;
			});

		})
})();