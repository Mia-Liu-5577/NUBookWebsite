/** db **/
var User = require('./model.js').User;
// var Following = require('./model.js').Following;

/** get following from db **/
const getFollowing = (req, res) => {
    const accountName = req.params.user;
    console.log(accountName);
    User.find({accountName: accountName}, (error, docs) => {
        /** 404 not found **/
        if (!docs[0]) {
            return res.sendStatus(404)
        }

        if (error) {
            return res.status(500).send({error: error});
        }

        /** return json **/
        return res.status(200).send({accountName: docs[0].accountName, following: docs[0].following});
    })
};

const putFollowing = (req, res) => {
    const temp = req.params.user.split(',');
    const user2Add = temp[0];
    const accountName = temp[1];

    /** pull that user from following **/
    User.find({accountName: user2Add}, (error, users) => {
        /** 404 not found **/
        if (!users[0]) {
            return res.sendStatus(404)
        }

        if (error) {
            return res.status(500).send({error: error});
        }

        User.findOneAndUpdate({accountName: accountName}, {$addToSet: {following: user2Add}}, {upsert: true, new: true}, (error, doc) => {
            /** 404 not found **/
            if (!doc) {
                return res.sendStatus(404)
            }

            if (error) {
                return res.status(500).send({error: error});
            }

            return res.status(200).send({accountName: doc.accountName, following: doc.following});
        });
    })

};

/** delete follower according to account name **/
const deleteFollowing = (req, res) => {
    const temp = req.params.user.split(',');
    const user2Delete = temp[0];
    const accountName = temp[1];

    /** pull that user from following **/
    User.findOneAndUpdate({accountName: accountName}, {$pull: {following: user2Delete}}, {new: true}, (error, doc) => {
        /** 404 not found **/
        if (!doc) {
            return res.sendStatus(404)
        }

        if (error) {
            return res.status(500).send({error: error});
        }

        return res.status(200).send({accountName: doc.accountName, following: doc.following});
    });
};

module.exports = app => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', putFollowing);
    app.delete('/following/:user', deleteFollowing);
};
