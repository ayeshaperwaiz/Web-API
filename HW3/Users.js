var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var mongodb = 'mongodb://ayesha:perwaiz@ds147884.mlab.com:47884/webapi';
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// user schema
var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: false }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
    var user = this;

    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        // change the password to the hashed version
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, callback) {
    var user = this;

    bcrypt.compare(password, user.password, function(err, isMatch) {
        callback(isMatch) ;
    });
};

// return the model
module.exports = mongoose.model('User', UserSchema);