var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongodb = 'mongodb://ayesha:perwaiz@ds147884.mlab.com:47884/webapi';
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Movie schema
var MovieSchema = new Schema({
    title: { type: String, required: true, index: { unique: true }},
    YearReleased: { type: String },
    genre: { type: String, required: true, enum:['Action','Adventure','Comedy','Fantasy','Horror','Mystery','Thriller','Drama','Western']},
    actors : { type : Array , "default" : [] }
});


// return the model
module.exports = mongoose.model('Movie', MovieSchema);