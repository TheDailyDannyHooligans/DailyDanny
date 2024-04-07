const axios = require('axios');

// request, response
exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response) {
            console.log(response.data)
            //res.render('index', { users: response.data });
            res.send(response.data);
        })
        .catch(err => {
            res.send(err);
        });

    //res.send("Login");
    //res.render('index', { users: "New Data" }); // renders html file
    // no need to specify .ejs extension because the view engine has already been specified with .ejs file extension
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render('update_user', { user: userdata.data });
        })
        .catch(err => {
            res.send(err);
        });
}