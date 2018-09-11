var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongodb = 'mongodb://ayesha:perwaiz@ds213209.mlab.com:13209/moviedb';
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// user schema

var actorSchema = Schema({
    actorName: {type:String,required: true},
    characterName: {type:String,required:true}
});

var movieSchema = Schema({
    Title:{type: String, required: true, index: { unique: true }},
    releaseYear: {type: Number, required: true},
    Genre:{
        type: String,
        enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
            'Horror', 'Mystery', 'Thriller', 'Western']
    },
    Actors: {type:[actorSchema]}
});

movieSchema.pre('save',function (next) {
    if(this.Actors.length < 3){
        return next(new Error('Fewer than 3 Actors'));
    }
    next()
});

module.exports = mongoose.model('Movie', movieSchema);