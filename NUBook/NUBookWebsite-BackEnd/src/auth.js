/** user, article and comment db **/
var User = require('./model.js').User;
var Article = require('./model.js').Article;
var Comment = require('./model.js').Comment;

const cookieParser = require('cookie-parser');
const md5 = require('md5');

/** Set a cookie for the user
    Store session id in an in-memory map from session to user
 **/
var sessionUser = {};
const cookieKey = 'sid';
const session = require('express-session');

/** set up google strategy **/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = {
    clientID: '225768269151-12edee7212o2pf1pmd2p8chhcd9jnj4p.apps.googleusercontent.com',
    clientSecret: 'HgSQtAncgEfMB7LfhNx1LoOE',
    callbackURL: '/auth/google/callback'
};


/** register with user info **/
const registration = (req, res) => {
    const accountName = req.body.accountName;
    const displayName = req.body.displayName;
    const emailAddress = req.body.emailAddress;
    const birthday = req.body.birthday;
    const phoneNumber = req.body.phoneNumber;
    const zipCode = req.body.zipCode;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const headline = req.body.headline;
    const following = ["HIRI"];

    /** Salted Passwords **/
    const salt = md5("password for " + accountName);
    const hash = md5(salt + " is " + password);

    /** store user info to db **/
    User.create({accountName:accountName, displayName:displayName, emailAddress:emailAddress, birthday:birthday,
                 phoneNumber:phoneNumber, zipCode:zipCode, password:password, avatar:avatar, headline:headline, following:following,
                 salt:salt, hash:hash}, (error, doc) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        else {
            return res.status(200).send({accountName: accountName, result: 'success'});
        }
    })

};

/** login with account name and password **/
const login = (req, res) => {
    const accountName = req.body.accountName;
    const password = req.body.password;

    /** invalid request **/
    if (!accountName || !password) {
        return res.sendStatus(400)
    }

    /** search user info in db **/
    User.find({accountName:accountName}, (error, docs) => {
        const userObj = docs[0];

        /** account not in db or password not match **/
        if (!userObj || !isMatch(userObj, req)) {
            return res.sendStatus(401);
        }

        /** If match, set a cookie for the user
            Store session id in an in-memory map from session to user  **/
        const sessionKey = md5("session key for " + userObj.accountName + " time is " + new Date().getTime());
        sessionUser[sessionKey] = userObj;
        res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true});
        res.cookie('accountName', accountName, {maxAge: 3600*1000, httpOnly: true});

        return res.send({accountName: accountName, result: 'success'});
    })

};

/** check whether account name matches with password **/
const isMatch = (userObj, req) => {
    const salt = userObj.salt;
    const password = req.body.password;
    return md5(salt + " is " + password) === userObj.hash;
};

/** logout including deleting session key and related cookie **/
const logout = (req, res) => {
    if (req.isAuthenticated()) {
        req.session.destroy();
        req.logout();
        return res.status(200).send("OK");
    }
    else {
        const sessionKey = req.cookies[cookieKey];
        delete sessionUser[sessionKey];
        res.clearCookie(cookieKey);
        res.status(200).send("OK");
    }

};

/** check whether user successfully login in **/
const isLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        /** if third party login, check if there is already third party authorization **/
        User.findOne({'authorization.Google': req.user.name.givenName + req.user.name.familyName}, (error, user) => {
           if (user) {
               req.accountName = user.accountName;
               return next();
           }
           else {
               const accountName = req.user.name.givenName + req.user.name.familyName + "@Google";
               req.accountName = accountName;
               return next();
           }
        });

    }
    else {
        const sessionKey = req.cookies[cookieKey];

        console.log("test: " + sessionKey);

        /** not login in **/
        if (!sessionKey || !sessionUser[sessionKey]) {
            return res.sendStatus(401);
        }
        /** successful login **/
        else {
            req.accountName = sessionUser[sessionKey].accountName;
            return next();
        }
    }
};

/** update user's password **/
const password = (req, res) => {
    //ToDo: reset password
    const accountName = req.body.accountName;
    const password = req.body.password;

    /** Salted Passwords **/
    const salt = md5("password for " + accountName);
    const hash = md5(salt + " is " + password);

    /** update the password **/
    User.update({accountName: accountName}, {password: password, salt: salt, hash: hash}, (error, doc) => {
        if (error) {
            return res.status(500).send({error: error});
        }

        return res.status(200).send({accountName: accountName, password: password, salt: salt, hash: hash})
    })
};

/** third party authentication: Google login **/

/** login with Google: create a new user according to info from Google account **/
passport.use(new GoogleStrategy(config, (accessToken, refreshToken, profile, done) => {
    /** check if there is already third-party authorization **/
    User.findOne({'authorization.Google': profile.name.givenName + profile.name.familyName}, (error, user) => {
       if (user) {
           return done(null, profile);
       }
       else {
           const accountName = profile.name.givenName + profile.name.familyName + "@Google";
           const avatar = profile.photos[0].value;
           const emailAddress = "niomi.liu@gmail.com";
           const birthday = "1997-05-07";
           const phoneNumber = "206-549-1074";
           const zipCode = "98026";
           const headline = "Hi I'm Ni, this is my Google account.";
           const following = ["Mia"];

           /** search the user by  accountName **/
           User.find({accountName: accountName}, (error, docs) => {
               const userObj = docs[0];
               if(!userObj){
                   User.create({accountName:accountName, emailAddress:emailAddress, birthday:birthday, phoneNumber:phoneNumber,
                       zipCode:zipCode, avatar:avatar, headline:headline, following:following}, (error, doc) => {

                       /** error **/
                       if (error) {
                           return res.status(500).send({ error: error });
                       }
                   });
               }
           });
           return done(null, profile);
       }
    });
}));

let users = {};

/** serialize the user for the session **/
passport.serializeUser( (user, done) => {
    console.log("passport.serial");
    console.log(user);
    users[user.id] = user;
    done(null, user.id);
});

/** deserialize the user from the session **/
passport.deserializeUser((id, done) => {
    console.log("passport.deserial");
    console.log(id);
    const user = users[id];
    done(null, user);
});

/** if third party authentication succeeds, redirect to main page **/
const GoogleLogin = (req, res) => {
    console.log("google login");
    res.redirect("https://nubook-liun1.surge.sh/#/main")
};

/** if third party authentication fails, return auth page **/
const fail = (req, res) => {
    res.redirect("https://nubook-liun1.surge.sh/#/auth")
};

/** merge two array list without duplicate elements **/
function mergeArray(arr1, arr2) {
    var _arr = [];
    for(var i = 0; i < arr1.length; i++){
        _arr.push(arr1[i]);
    }
    for(var i = 0; i < arr2.length; i++){
        var flag = true;
        for(var j = 0; j < arr1.length; j ++){
            if(arr2[i] === arr1[j]){
                flag = false;
                break;
            }
        }
        if(flag) {
            _arr.push(arr2[i]);
        }
    }
    return _arr;
}

/** link third-party account with local account **/
const link = (req, res) => {
    const accountName = req.body.accountName;
    const password = req.body.password;

    /** empty input is not allowed **/
    if (!accountName || !password) {
        return res.status(400).send({error: "Invalid account name or password."})
    }

    User.find({accountName: accountName}).exec(function (error, users) {
        /** no registered user found **/
        if (!users || users.length === 0) {
            return res.status(400).send({error: "this user has not registered."})
        }

        const userObj = users[0];

        /** check if account name matches with password **/
        const salt = userObj.salt;
        const hash = userObj.hash;
        if (md5(salt + " is " + password) === hash) {
            /** change the author of article and comment **/
            Article.update({author: req.accountName}, {author: accountName, avatar: userObj.avatar}, {new: true, multi: true}, function () {});
            Article.update({'comments.author': req.accountName}, {'comments.$.author': accountName}, {new: true, multi: true}, function () {});
            Comment.update({author: req.accountName}, {author: accountName}, {new: true, multi: true}, function () {});

            /** merge the follower list **/
            User.findOne({accountName: req.accountName}).exec(function (error, gg_user) {
                if (gg_user) {
                    const google_following = gg_user.following;
                    const local_following = userObj.following;
                    const new_following = mergeArray(google_following, local_following);
                    User.update({accountName: accountName}, {following: new_following}, function () {});

                    User.remove({accountName: req.accountName}, (error, res) => {});
                }

            });

            /** add third party account to authorization array **/
            User.findOne({accountName: accountName}, (error, local_user) => {
                if (local_user) {
                    const gg_accountName = req.accountName.split('@');
                    let auth = {};
                    auth[gg_accountName[1]] = gg_accountName[0];
                    const oldAuthorization = local_user.authorization;
                    const newAuthorization = oldAuthorization.concat(auth);
                    User.update({accountName: accountName}, {authorization: newAuthorization}, function () {})
                }
            });

            return res.status(200).send({accountName: accountName, result: "success"});
        }
        else {
            return res.status(401).send("account name and password not match");
        }

    })
};

const unlink = (req, res) => {
    const accountName = req.accountName;
    User.findOne({accountName: accountName}).exec(function (error, user) {
        if (user.authorization.length !== 0) {
            User.update({accountName: accountName}, {authorization: []}, {new: true}, function () {
                return res.status(200).send({result: "successfully unlink"});
            })
        }
        else {
            return res.status(400).send("error");
        }
    })
};


/** endpoints **/
module.exports = app => {
    app.post('/login',login);
    app.post('/register', registration);

    app.use(session({secret:'thisIsMySecretMessageHowWillYouGuessIt', resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login/auth/google', passport.authenticate('google', {scope: ['profile']}));
    app.get('/auth/google/callback', passport.authenticate('google', {successRedirect: '/ggLogIn', failureRedirect: '/fail'}));

    app.use(isLogin);

    app.use('/ggLogin', GoogleLogin);
    app.use('/fail', fail);

    app.post('/link', link);
    app.get('/unlink', unlink);

    app.put('/logout', logout);
    app.put('/password', password);
};
