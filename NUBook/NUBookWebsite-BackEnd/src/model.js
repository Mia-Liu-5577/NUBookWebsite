// this is model.js
var mongoose = require('mongoose');
require('./db.js');

/**  **/
var commentSchema = new mongoose.Schema({
    commentId: Number,
    author: String,
    date: Date,
    text: String
});

var articleSchema = new mongoose.Schema({
    id: Number,
    text: String,
    date: Date,
    img: String,
    author: String,
    avatar: String,
    comments: [ commentSchema ]
});

var userSchema = new mongoose.Schema({
    accountName: String,
    displayName: String,
    emailAddress: String,
    birthday: String,
    phoneNumber: String,
    zipCode: String,
    password: String,
    avatar: String,
    headline: String,
    following: [ String ],
    salt: String,
    hash: String,
    auth: String,
    authorization: [ Object ]
});

var profileSchema = new mongoose.Schema({
    accountName: String,
    displayName: String,
    emailAddress: String,
    birthday: String,
    phoneNumber: String,
    zipCode: String,
    password: String,
    avatar: String,
    headline: String,
    following: [ String ],
    salt: String,
    hash: String
});

// var followingSchema = new mongoose.Schema({
//     username: String,
//     following: [ String ]
// });

/** added  **/
exports.Comment = mongoose.model('comment', commentSchema);
exports.User = mongoose.model('user', userSchema);
// exports.Following = mongoose.model('following', followingSchema);

exports.Article = mongoose.model('article', articleSchema);
exports.Profile = mongoose.model('profile', profileSchema);
