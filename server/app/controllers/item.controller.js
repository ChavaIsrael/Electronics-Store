
const db = require("../models");
const Item = db.Item;
   
//Create  item
exports.createItem = (req, res) => {
 // check if there are all the details
    if (!req.body.id || !req.body.itemName || !req.body.itemCost || !req.body.itemDescription || !req.body.itemImage || !req.body.itemCategory) {
        return res.status(400).send({
            message: "one or more details are missing"
        });
    }
    // create new item
    const item = new Item({
        id: req.body.id,
        itemName: req.body.itemName,
        itemCost: req.body.itemCost,
        itemDescription: req.body.itemDescription,
        itemImage: req.body.itemImage,
        itemCategory: req.body.itemCategory
    });

    // save in the userCart
    item.save()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while saving the item!"
            });
        });
}

//Get item by id
exports.getItem=(req, res) => {
    // check if there are all the details
    if (!req.body.id) {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
    Item.find({id:req.body.id})
    .then(items => {
        res.send(items);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the items"
        });
    });
}

//Get items by category
exports.getItemsList=(req, res) => {
    // check if there are all the details
    if (!req.query.itemCategory) {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
    Item.find({itemCategory:req.query.itemCategory})
    
    .then(items => {
        res.send(items);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the items"
        });
    });
}


exports.getItems = (req, res) => {
    Item.find(req.query)
    .then(items => {
        res.send(items);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An error occurred while reading the items"
        });
    });
}
exports.getItemsListByQuery=(req, res) => {
    if (req.query.id){
        this.getItems(req, res)
    }
    else if (req.query.itemCategory){
        this.getItemsList(req, res)
    }
    else {
        return res.status(400).send({
            message: "one or more details are missing"
    });
    }
}

