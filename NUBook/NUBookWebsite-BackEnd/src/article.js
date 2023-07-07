/** db **/
var Comment = require('./model.js').Comment;
var Article = require('./model.js').Article;
var User = require('./model.js').User;

/** cookie **/
const cookieParser = require('cookie-parser');
const cookieKey = 'sid';

/** get article list from db **/
const getArticle = (req, res) => {
    console.log(req.params);
    /** id there is no specific user id, return all articles in db **/
    if (!req.params.id) {
        const accountName = req.accountName;
        let user_and_following = [accountName];
        User.find({accountName: accountName}, (error, docs) => {
            /** 404 not found **/
            if (!docs[0]) {
                return res.sendStatus(404)
            }

            if (error) {
                return res.status(500).send({error: error});
            }

            docs[0].following.forEach(f => {
                user_and_following.push(f);
            });

            /** find articles, limit 10 max, sort by date **/
            Article.find({author: {$in: user_and_following}}).limit(10).sort({date: -1}).exec((error, docs) => {
                if (error) {
                    return res.status(500).send({error: error});
                }

                let articles = [];
                docs.forEach(article => {
                    articles.push(article);
                });

                return res.status(200).send({accountName: accountName, articles: articles})
            })
        })



        // Following.find({username: username}, (error, docs) => {
        //     if (!docs[0])
        //         return res.sendStatus(403);
        //     if (error)
        //         return res.status(500).send({ error: error });
        //     docs[0].following.forEach(d =>{following.push(d)});
        //     // fetch articles
        //     Article.find({author: {$in: following}}).limit(10).sort({date: -1}).exec((error, docs) => {
        //         if (error)
        //             return res.status(500).send({ error: error });
        //         let articles = {articles: []};
        //         docs.forEach(doc => {articles.articles.push(doc)});
        //         return res.status(200).send(articles);
        //     });
        // });
    }
    /** else return articles for users in req **/
    else {
        const accountName = req.params.id;
        let user_and_following = [accountName];
        User.find({accountName: accountName}, (error, docs) => {
            /** 404 not found **/
            if (!docs[0]) {
                return res.sendStatus(404)
            }

            if (error) {
                return res.status(500).send({error: error});
            }

            docs[0].following.forEach(f => {
                user_and_following.push(f);
            });

            /** find articles, limit 10 max, sort by date **/
            Article.find({author: {$in: user_and_following}}).limit(10).sort({date: -1}).exec((error, docs) => {
                if (error) {
                    return res.status(500).send({error: error});
                }

                let articles = [];
                docs.forEach(article => {
                    articles.push(article);
                });

                return res.status(200).send({accountName: accountName, articles: articles})
            })
        })
    }
};

/** back up **/
// const getArticle = (req, res) => {
//     console.log(req.params);
//     /** id there is no specific user id, return all articles in db **/
//     if (!req.params.id) {
//         const accountName = req.accountName;
//         Article.find({author: accountName}, (error, doc) => {
//             if (!doc)
//                 return res.sendStatus(404);
//
//             if (error)
//                 return res.status(500).send({ error: error });
//
//             res.status(200).send({articles: doc});
//         });
//     }
//     /** else return articles for users in req **/
//     else {
//         const accountName = req.params.id;
//         Article.find({author: accountName}, (error, doc) => {
//             if (!doc)
//                 return res.sendStatus(404);
//
//             if (error)
//                 return res.status(500).send({ error: error });
//
//             res.status(200).send({articles: doc});
//         });
//     }
// };

/** post new article to db **/
const postArticle = (req, res) => {
    console.log(req.body);
    const author = req.body.author;
    const avatar = req.body.avatar;
    const text = req.body.text || "";
    const img = req.body.img || null;
    const date = new Date();

    /** find all articles and create a new article to return new article list **/
    Article.find().exec(function (err, results) {
        const newPosts = {id: results.length, text: text, date: date, img: img, author: author, avatar: avatar, comments: []};
        var beforePostLength = results.length;

        /** create new post **/
        Article.create(newPosts, (error, doc) => {
            if (!doc) {
                return res.sendStatus(404);
            }

            if (error) {
                return res.status(500).send({error: error});
            }

            var newPost = doc;
            results.push(doc);
            // /** return new article list **/
            // return res.status(200).send({articles: [doc]});

            /** return new article list **/
            return res.status(200).send({beforePostLength: beforePostLength, newPost: newPost, articles: results});
        });

    })

};

const putArticle = (req, res) => {
    //ToDo: edit posts
    const _id = req.params.id;
    const accountName = req.accountName;
    const text = req.body.text;
    const commentId = req.body.commentId;

    let articles = [];

    /** edit article **/
    if (!commentId) {
        Article.update({_id: _id}, {text: text}, (error, doc) => {
            if (error) {
                return res.status(500).send({error: error});
            }

            articles.push(doc);
            return res.status(200).send({articles: articles});
        })
    }
    /** add new comment **/
    else if (commentId === -1) {
        const new_commentId = Math.floor((Math.random() * 60335710312) + 3);
        const new_comment =new Comment({commentId: new_commentId, author: accountName, date: new Date(), text: text});

        /** create new comment in Comment db **/
        Comment.create(new_comment, (error, doc) => {
            if (error) {
                return res.status(500).send({error: error});
            }
        });

        Article.findByIdAndUpdate(_id, {$addToSet: {comments: new_comment}}, {upsert: true, new: true}, (error, doc) => {
            if (error) {
                return res.status(500).send({error: error});
            }

            articles.push(doc);
            return res.status(200).send({articles: articles});
        })
    }
    /** edit comment **/
    else {
        /** update comment db **/
        Comment.update({commentId: commentId}, {text: text}, (error, doc) => {
            if (error) {
                return res.status(500).send({error: error});
            }

            /** update comment of article **/
            Article.findOneAndUpdate({_id: _id, 'comments.commentId': commentId}, {'comments.$.text': text}, {upsert: true, new: true}, (error, doc_post) => {
                if (error) {
                    return res.status(500).send({error: error});
                }
                articles.push(doc_post);
                return res.status(200).send({articles: articles});
            })

        })
    }

    // Comment.findOneAndUpdate({commentId: commentId}, { $set: { text: text }}, (error, doc) => {
    //     if (!doc) return res.sendStatus(400);
    //     if (error) return res.status(500).send({ error: error });
    //     Article.findOneAndUpdate({_id: articleId, 'comments.commentId': commentId}, {$set: {'comments.$.text': text}},
    //         {upsert: true, new: true}, (error, docArticle) => {
    //             if (error) return res.status(500).send({ error: error });
    //             articles.articles.push(docArticle);
    //             return res.status(200).send(articles);
    //         });
    // });
};

module.exports = (app) => {
    app.get('/articles/:id?', getArticle);
    app.post('/article', postArticle);

    app.put('/articles/:id?', putArticle);
};