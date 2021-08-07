
const db = require("../models");
const User = db.User;

//Create user
exports.createUser = (req, res) => {
    // check if there are all the details
    if (!req.body.password || !req.body.email || !req.body.phone || !req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "one or more details are missing"
        });
    }
    // create new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });

    // save in the user's details
    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while saving the user!"
            });
        });
}
//Get user by query
exports.getUserByQuery = (req, res) => {
    if (req.query.phone && req.query.email){
        this.getUserByPhoneEmail(req, res)
    }
    else if (req.query.password && req.query.email){
        this.getUserByPasswordEmail(req, res)
    }
    else if (req.query.email){
        this.getUserByEmail(req, res)
    }
    else {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
}
//Get user email and password
exports.getUserByPasswordEmail=(req, res) => {
    User.find({email:req.query.email, password:req.query.password})
    .then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the users"
        });
    });
}

//Get user by email and phone
exports.getUserByPhoneEmail=(req, res) => {
    User.find({email:req.query.email, phone:req.query.phone})
    .then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the users"
        });
    });
}

//Get user by email
exports.getUserByEmail=(req, res) => {
    User.find({email:req.query.email})
    .then(users => {
        res.send(users);
        return users[0].id
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the users"
        });
    });
}

//update
exports.updateUser = (req, res) => {
    //check validation
    if (!req.query.id) {
        return res.status(400).send({
            message: "user's detail can't be empty"
        });
    }
    // update in the DB
    User.findByIdAndUpdate(req.query.id, {
        id: req.body.id,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }, { new: true })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "user's detail " + req.query.email + " not found"
            });
        }
        else {
            res.send({ message: "user's detail " + user + " updated successfully" });
        }
    }).catch(error => {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "user's detail " + req.query.email + " not found"
            });
        }
        else {
            return res.status(500).send({
                message: error.message || "An error occurred while updating the email" + req.query.email
            });
        }
    });
};
