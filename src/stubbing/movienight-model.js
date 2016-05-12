var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieNightSchema = new Schema({
    date: Date,
    movieTitle: String
});

module.exports = mongoose.model('MovieNight', MovieNightSchema);
