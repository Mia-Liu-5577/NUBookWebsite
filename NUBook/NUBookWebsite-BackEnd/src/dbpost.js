var fs = require("fs");
const md5 = require('md5');

/** read initial dara from json file **/
var registered_user = JSON.parse(fs.readFileSync("./assets/registered_user.json")).registered_user;
var articles = JSON.parse(fs.readFileSync("./assets/articles.json")).articles;

// console.log(articles);

/** user db **/
var User = require('./model.js').User;
var Profile = require('./model.js').Profile;
for (var i = 0; i < registered_user.length; i ++) {
    const salt = md5("password for " + registered_user[i].accountName);
    const hash = md5(salt + " is " + registered_user[i].password);

    /** create new registered user **/
    new User({ "accountName":  registered_user[i].accountName,
               "displayName":  registered_user[i].displayName,
               "emailAddress": registered_user[i].emailAddress,
               "birthday":     registered_user[i].birthday,
               "phoneNumber":  registered_user[i].phoneNumber,
               "zipCode":      registered_user[i].zipCode,
               "password":     registered_user[i].password,
               "avatar":       registered_user[i].avatar,
               "headline":     registered_user[i].headline,
               "following":    registered_user[i].following,
               "salt":         salt,
               "hash":         hash,
               "authorization": []}).save();
}

/** connect user with their followers **/
// var Following = require('./model.js').Following;
// for (var i = 0 ; i < registered_user.length; i ++) {
//     new Following({ "accountName": registered_user[i].accountName,
//                     "following":   registered_user[i].following}).save();
// }

/** posts db **/
var Article = require('./model.js').Article;
for (var i = 0; i < articles.length; i ++) {
    new Article(articles[i]).save();
}

/** comments db **/
var Comment = require('./model.js').Comment;
new Comment({"commentId": 1, "author": "liun1", "date": null, "text": "What a post!"}).save();
new Comment({"commentId": 2, "author": "wefw6", "date": null, "text": "Cool! How can you think of it?"}).save();
new Comment({"commentId": 3, "author": "sdqw6", "date": null, "text": "Oh! You are so smart!"}).save();
new Comment({"commentId": 4, "author": "bhiu2", "date": null, "text": "Ni, you are the most beautiful woman I've ever met."}).save();
new Comment({"commentId": 5, "author": "lbhf3", "date": null, "text": "I think ti76 is right."}).save();
