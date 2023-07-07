/** user db **/
var User = require('./model.js').User;
var Article = require('./model.js').Article;

const cookieParser = require('cookie-parser');

/** search headline according to account name **/
const getHeadline = (req, res) => {
    if (!req.params.users) {
        const accountName = req.accountName;
        console.log(accountName);
        if (accountName) {
            User.find({accountName: {$in: accountName}}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404)
                }

                if (error) {
                    return res.status(500).send({error: error});
                }

                /** find user and return his/her account name and headline **/
                let headline_array = {headline: []};
                docs.forEach(doc => {headline_array.headline.push({accountName: doc.accountName, headline: doc.headline})});
                res.status(200).send(headline_array);
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.users.split(',');
        if (accountName) {
            User.find({accountName: {$in: accountName}}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404)
                }

                if (error) {
                    return res.status(500).send({error: error});
                }

                /** find user and return his/her account name and headline **/
                let headline_array = {headline: []};
                docs.forEach(doc => {headline_array.headline.push({accountName: doc.accountName, headline: doc.headline})});
                res.status(200).send(headline_array);
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }

};

/** update headline to db **/
const putHeadline = (req, res) => {
    const accountName = req.body.accountName;
    const headline = req.body.headline;
    console.log(accountName);
    console.log(headline);
    User.update({accountName: accountName}, {headline: headline}, (error, doc) => {
        if (error) {
            return res.status(500).send({error: error});
        }
        else {
            return res.status(200).send({accountName: accountName, headline: headline})
        }
    })
};

/** get avatar according to account name **/
const getAvatar = (req, res) => {
    const accountName = req.params.users.split(',');
    if (accountName) {
        User.find({accountName: {$in: accountName}}, (error, docs) => {
            /** 404 not found **/
            if (!docs[0]) {
                return res.sendStatus(404)
            }

            if (error) {
                return res.status(500).send({error: error});
            }

            /** find user and return his/her account name and avatar **/
            let avatar_array = {avatar: []};
            docs.forEach(doc => {avatar_array.avatar.push({accountName: doc.accountName, avatar: doc.avatar})});
            res.status(200).send(avatar_array);
        })
    }
    /** 404 not found **/
    else {
        res.sendStatus(404)
    }
};

const putAvatar = (req, res) => {
    //ToDo: reset user's avatar
    const accountName = req.body.accountName;
    const avatar = req.body.avatar;

    User.update({accountName: accountName}, {avatar: avatar}, (error, doc) => {
        /** error **/
        if (error) {
            return res.status(500).send({ error: error });
        }

        Article.update({author: accountName}, {$set: {avatar: avatar}}, {multi: true}, (error, doc) => {
            /** error **/
            if (error) {
                return res.status(500).send({ error: error });
            }

            return res.status(200).send({accountName: accountName, avatar: avatar});
        });


    })
};


const getEmail = (req, res) => {
    //ToDo: get email address
    if (!req.params.user) {
        const accountName = req.accountName;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, emailAddress: docs[0].emailAddress})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.user;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, emailAddress: docs[0].emailAddress})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
};

const putEmail = (req, res) => {
    //ToDo: reset email address
    const accountName = req.body.accountName;
    const emailAddress = req.body.emailAddress;

    User.update({accountName: accountName}, {emailAddress: emailAddress}, (error, doc) => {
        /** error **/
        if (error) {
            return res.status(500).send({ error: error });
        }

        return res.status(200).send({accountName: accountName, emailAddress: emailAddress});
    })
};

const getZipcode = (req, res) => {
    //ToDo: get zip code
    if (!req.params.user) {
        const accountName = req.accountName;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, zipCode: docs[0].zipCode})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.user;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, zipCode: docs[0].zipCode})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
};

const putZipcode = (req, res) => {
    //ToDo: reset zip code
    const accountName = req.body.accountName;
    const zipCode = req.body.zipCode;

    User.update({accountName: accountName}, {zipCode: zipCode}, (error, doc) => {
        /** error **/
        if (error) {
            return res.status(500).send({ error: error });
        }

        return res.status(200).send({accountName: accountName, zipCode: zipCode});
    })
};

const getDob = (req, res) => {
    //ToDo: get birthday
    if (!req.params.user) {
        const accountName = req.accountName;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, birthday: docs[0].birthday})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.user;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, birthday: docs[0].birthday})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
};

/** get user's display name **/
const getDisplayName = (req, res) => {
    if (!req.params.user) {
        const accountName = req.accountName;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, displayName: docs[0].displayName})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.user;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, displayName: docs[0].displayName})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
};

/** get user's phone number **/
const getPhone = (req, res) => {
    if (!req.params.user) {
        const accountName = req.accountName;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, phoneNumber: docs[0].phoneNumber})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.user;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, phoneNumber: docs[0].phoneNumber})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
};

/** get user's password **/
const getPassword = (req, res) => {
    if (!req.params.user) {
        const accountName = req.accountName;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, password: docs[0].password})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
    else {
        const accountName = req.params.user;
        if (accountName) {
            User.find({accountName: accountName}, (error, docs) => {
                /** 404 not found **/
                if (!docs[0]) {
                    return res.sendStatus(404);
                }

                /** error **/
                if (error) {
                    return res.status(500).send({error: error});
                }

                return res.status(200).send({accountName: docs[0].accountName, password: docs[0].password})
            })
        }
        /** 404 not found **/
        else {
            res.sendStatus(404)
        }
    }
};

const getAccountName = (req, res) => {
    var accountName = req.accountName;
    console.log(accountName);
    return res.status(200).send({accountName: accountName});
};

module.exports = (app) => {
    app.get('/headlines/:users?', getHeadline);
    app.put('/headline', putHeadline);

    app.get('/avatar/:users?', getAvatar);

    app.get('/email/:user?', getEmail);
    app.put('/email', putEmail);

    app.get('/zipcode/:user?', getZipcode);
    app.put('/zipcode', putZipcode);

    app.get('/dob/:user?', getDob);

    app.put('/avatar', putAvatar);

    app.get('/display/:user?', getDisplayName);
    app.get('/phone/:user?', getPhone);
    app.get('/password/:user?', getPassword);
    app.get('/accountname', getAccountName);
};