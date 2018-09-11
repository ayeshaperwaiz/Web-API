var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongodb = 'mongodb://ayesha:perwaiz@ds213209.mlab.com:13209/moviedb';
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var reviewSchema = Schema({
    MovieTitle:{type: String, required: true},
    ReviewerName: {type:String,required: true},
    smallQuote: {type: String, required: true},
    rating:{type:Number, max:5, min:1, required: true}
});


reviewSchema.pre('save',function (next) {
    if(this.length == 0){
        return next(new Error('There must be one reviewer'));
    }
    next()
});

module.exports = mongoose.model('Review', reviewSchema);