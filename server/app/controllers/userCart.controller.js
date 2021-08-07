
const db = require("../models");
const UserCart = db.UserCart;

//Create user's cart ^
exports.createUserCart = (req, res) => {
    // check if there are all the details
    if (!req.body.userEmail || !req.body.itemId || !req.body.itemCount) {
        return res.status(400).send({
            message: "one or more details are missing"
        });
    }
    // create new user
    const userCart = new UserCart({
        userEmail: req.body.userEmail,
        itemId: req.body.itemId,
        itemCount: req.body.itemCount
    });

    // save in the userCart
    userCart.save()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while saving the user!"
            });
        });
}

//Get user email and password
exports.getUserByPasswordEmail=(req, res) => {
    // check if there are all the details
    if (!req.body.password || !req.body.email) {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
    User.find({email:req.body.email, password:req.body.password})
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
    // check if there are all the details
    if (!req.body.email || !req.body.phone) {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
    User.find({email:req.body.email, password:req.body.phone})
    .then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the users"
        });
    });
}

//Get user's cart by email ^
exports.getUserItemsList=(req, res) => {
    // check if there are all the details
    if (!req.query.userEmail) {
        return res.status(400).send({
            message: "email is missing"
        });
    }
    UserCart.find({userEmail:req.query.userEmail})
    .then(usersCart => {
        res.send(usersCart);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the user's cart"
        });
    });
}

//Get item in user's cart ^
exports.getUserItemList=(req, res) => {
    // check if there are all the details
    if (!req.query.userEmail || !req.query.itemId) {
        return res.status(400).send({
            message: "email is missing"
        });
    }
    UserCart.find({userEmail:req.query.userEmail, itemId:req.query.itemId})
    .then(usersCart => {
        res.send(usersCart);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the user's cart"
        });
    });
}

//Update user's cart ^
exports.updateUserItem = (req, res) => {
    //check validation
    if (!req.body.itemId || !req.body.userEmail || !req.body.itemCount) {
        return res.status(400).send({
            message: "user's cart can't be empty"
        });
    }
    // update in the DB
    UserCart.findByIdAndUpdate(req.query.id, {
        id: req.body.id,
        userEmail: req.body.userEmail,
        itemId: req.body.itemId,
        itemCount: req.body.itemCount
    }, { new: true })
        .then(userCart => {
            if (!userCart) {
                return res.status(404).send({
                    message: "user's detail " + req.query.userEmail + " not found"
                });
            }
            else {
                res.send({ message: "user's detail " + userCart + " updated successfully" });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: "user's detail " + req.query.userEmail + " not found"
                });
            }
            else {
                return res.status(500).send({
                    message: error.message || "An error occurred while updating the email" + req.query.userEmail
                });
            }
        });
};

//Delete user's item
exports.deleteUserCart = (req, res) => {
    UserCart.findByIdAndDelete(req.query.id)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "item " + req.query.id + " not found"
                });
            }
            else {
                res.send({ message: "item " + req.query.id + " deleted successfully" });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: "item " + req.query.id + " not found"
                });
            }
            return res.status(500).send({
                message: error.message || "An error occurred while deleting the item" + req.query.id
            });
        });
};


exports.getItemsOfUser = (req, res) => {
    if (req.query.userEmail && req.query.itemId){
        this.getUserItemList(req, res)
    }
    else if (req.query.userEmail){
        this.getUserItemsList(req, res)
    }
    else {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
} 
