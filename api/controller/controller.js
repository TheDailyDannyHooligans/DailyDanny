const fs = require('fs');
const path = require('path');

let Userdb = require('../models/loginmodel');
let Imagedb = require('../models/imagemodel');

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

    const obj = {
		name: req.body.name,
		img: {
			data: fs.readFileSync(path.join(__dirname.substring(0, __dirname.length - 11) + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}

	Imagedb.create(obj)
	.then ((item) => {
        item.save();
        console.log('image sent');
	}).catch(err => { 
        res.status(500).send({ 
            message: err.message || "Some error ocurred while creating a create operation" 
        });
    });
}

// Get all images from db
exports.getImages = (req, res) => {
    Imagedb.find({})
	.then((data, err)=>{
		if(err){
            console.log('ERROR');
			console.log(err);
		}
		res.send(data);
	});
}

// Get image from db by image id
exports.getImage = (req, res) => {
    
}