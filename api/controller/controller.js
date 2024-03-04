let Userdb = require('../model/model');

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
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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