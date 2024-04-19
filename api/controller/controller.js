const fs = require('fs');
const path = require('path');

let Userdb = require('../models/loginmodel');
let Imagedb = require('../models/imagemodel');
let Articledb = require('../models/articlemodel');

// Create and save new user
exports.create = (req, res) => {
    const reqBody = JSON.parse(Object.keys(req.body)[0]);

    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    // new user
    const user = new Userdb({
        firstname: reqBody.firstname,
        lastname: reqBody.lastname,
        email: reqBody.email,
        password: reqBody.password,
        admin: reqBody.admin,
        editor: reqBody.editor,
        user: reqBody.user
    });

    // save user in the database
    user
        .save()
        .then(data => { 
            res.send(data);
        }).catch(err => { 
            res.status(500).send({ 
                message: err.message || "Some error ocurred while creating a create operation" 
            });
        });
}

// Retrieve and return all users/retrieve and return a single user
exports.find = (req, res) => {
    if (req.query.email) {
        const email = req.query.email;

        Userdb.findOne({ 'email': email })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "User not found" });
                } else if (data.password !== req.query.password) {
                    res.status(400).send({ message: "Incorrect password" });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving user with email " + email});
            });
    } else {
        // returns all users
        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retrieving user information"});
            });
    }
}

// Update a new identified user by user id
exports.update = async (req, res) => {
    console.log("UPDATE:");
    console.log(req);

    const id = req.params.id;
    const newPassword = req.query.password;
    let user;

    await Userdb.findById(id)
        .then(data =>{
            console.log('DATA');
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id});
            }else{
                user = data;
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        });

    console.log('BEFORE:');
    console.log(user);

    user.password = newPassword;

    console.log('AFTER:');
    console.log(user);

    await Userdb.findByIdAndUpdate(id, user, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user ${id}. Maybe user not found!`});
            } else {
                res.send(data);
            }   
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information"});
        });
}

// Add image to db
exports.addImage = (req, res, next) => {
    console.log('UPLOAD IMAGE');
    console.log(req);

    const obj = {
		img: {
			data: fs.readFileSync(path.join(__dirname.substring(0, __dirname.length - 11) + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		},
        advertisement: req.body.advertisement
	}

	Imagedb.create(obj)
	.then (async (item) => {
        await item.save();
        console.log('image sent');
        res.send(item);
	}).catch(err => { 
        res.status(500).send({ 
            message: err.message || "Some error ocurred while creating a create operation" 
        });
    });
}

// Get all images from db
exports.getImages = (req, res) => {
    if (req.query.advertisement === false) {
        Imagedb.find({ 'advertisement' : true })
        .then((data, err)=>{
            if(err){
                console.log('ERROR');
                console.log(err);
            }
            res.send(data);
        });
    } else {
        Imagedb.find({ 'advertisement' : false })
        .then((data, err)=>{
            if(err){
                console.log('ERROR');
                console.log(err);
            }
            res.send(data);
        });
    }
    
}

// Get image from db by image id
exports.getImage = (req, res) => {
    const id = req.params.id;

    console.log('GETTING IMAGE WITH ID ' + id);
    
    Imagedb.findById(id)
        .then((data, err)=>{
            if(err){
                console.log('ERROR');
                console.log(err);
            }
            res.send(data);
        });
}

exports.addArticle = (req, res) => {
    console.log('UPLOAD ARTICLE');
    const reqBody = JSON.parse(req.body['article']);

	Articledb.create(reqBody)
	.then ((item) => {
        item.save();
        console.log('article sent');
	}).catch(err => { 
        res.status(500).send({ 
            message: err.message || "Some error ocurred while creating a create operation" 
        });
    });
}

exports.getArticles = (req, res) => {
    if (req.query.status) {
        const status = req.query.status;

        if (status == 'Rejected') {
            const authorid = req.query.authorid;

            Articledb.find({ 'authorid': authorid, 'status': status })
                     .then(data => {
                         if (!data) {
                             res.status(404).send({ message: "Articles not found" });
                         } else {
                             res.send(data);
                         } 
                     })
                     .catch(err => {
                         res.status(500).send({ message: err.message || "Error retrieving articles with status " + req.query.status});
                     });
        } else {
            Articledb.find({ 'status': status })
                     .then(data => {
                         if (!data) {
                             res.status(404).send({ message: "Articles not found" });
                         } else {
                             res.send(data);
                         } 
                     })
                     .catch(err => {
                         res.status(500).send({ message: err.message || "Error retrieving articles with status " + req.query.status});
                     });
        }
    } else if (req.query.authorid) {
        const authorid = req.query.authorid;

        Articledb.find({ 'authorid': authorid })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Articles not found" });
                } else {
                    res.send(data);
                } 
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving articles with author id " + req.query.authorid});
            });
    } else if (req.query.top) {
        Articledb.find().sort({ views: -1 })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Articles not found" });
                } else {
                    res.send(data);
                } 
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving articles" });
            });
    } else if (req.query.super) {
        const isSuper = req.query.super;

        Articledb.find({ 'super': isSuper })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Article not found" });
                } else {
                    res.send(data);
                } 
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving article with id " + req.query.id});
            });
    } else if (req.query.id) {
        const id = req.query.id;

        Articledb.find({ '_id': id })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Article not found" });
                } else {
                    res.send(data);
                } 
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving article with id " + req.query.id});
            });
    } else if (req.query.topic) {
        const topic = req.query.topic;

        Articledb.find({ 'topic': topic })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Topic not found" });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving articles with topic " + req.query.topic});
            });
    } else {
        // returns all articles
        Articledb.find()
            .then(articles => {
                res.send(articles);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retrieving articles"});
            });
    }
}

exports.updateArticle = async (req, res) => {
    const reqBody = JSON.parse(req.body['article']);

    const id = req.params.id;
    const updateViews = req.query.views;
    let article;

    await Articledb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found article with id "+ id});
            }else{
                article = data;
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving article with id " + id})
        });

    console.log('BEFORE:');
    console.log(article);

    if (updateViews) article.views++;
    article.thumbnailid = reqBody.thumbnailid;
    article.title = reqBody.title;
    article.author = reqBody.author;
    article.content = reqBody.content;
    article.super = reqBody.super;
    article.topic = reqBody.topic;
    article.status = reqBody.status;
    article.reason = reqBody.reason;

    if (article.super == true)
    {
        Articledb.find({ 'super': true })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Article not found" });
                } else {
                    data.forEach(async (obj) => {
                        obj.super = false;

                        await Articledb.findByIdAndUpdate(obj._id, obj, { useFindAndModify: false })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({ message: `Cannot update article ${id}. Maybe article not found!`});
                                }
                            })
                            .catch(err => {
                                res.status(500).send({ message: "Error update article information"});
                        });
                        });
                } 
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving article with id " + req.query.id});
            });
    }

    console.log('AFTER:');
    console.log(article);

    await Articledb.findByIdAndUpdate(id, article, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update article ${id}. Maybe article not found!`});
            } else {
                res.send(data);
            }   
        })
        .catch(err => {
            res.status(500).send({ message: "Error update article information"});
    });

}
