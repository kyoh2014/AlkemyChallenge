const { Category }= require("../models/index")

// Category listing controller for user operations
const listController =  async(req, res) => {
    
    // Get all categories
    Category.findAll({
        where: {
            deletedAt:null
        },
        attributes: ['id', 'name']
    })
    // Return list of all categories
    .then(categories => {
        res.json({ data: categories });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred with the user's categories"  
        })
    });
};

// Category creation controller for user operations
const createController = async(req, res) => {

    // Creation of the category
    Category.create({
        name: req.body.name,
    })
    // Return of the created category
    .then(category => {
            res.json({ data: category });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        msg: 'An error occurred when creating an category'    
        })
    })
}

// Category finder handler by id
const searchByIdController = async(req, res) => {

    // Obtaining the category through the id
    Category.findByPk(req.params.id, {
        where: {
           deletedAt: null
        },
        attributes: ['deletedAt', 'name']
      })
    // Return of the obtained category
    .then(category => {
        res.json({ data: category });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred when searching for a user category"  
        })
    });
};

// Category update  controller
const updateController = async(req, res) => {

    // Obtaining the category to update
    Category.update({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        miniature: req.body.miniature
    }, {
        where: {
            id: req.params.id
        }
    })
    // Return of updated category
    .then(result => {
        res.json({ data: result });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred while updating a user category"  
        })
    });
};

// Category delete controller
const deleteController = async(req, res) => {

    // Obtaining the category to update
    Category.update({
        // The "null" is changed by the date on which the deletion was carried out
        deletedAt: new Date()
    }, {
        where: {
            id: req.params.id
        }
    })
    // Return the modified category, marked as deleted
    .then((result) => {
        res.status(201).send({ data: result });
    })
    .catch(err => {
        res.status(500).json({
            msg: "An error occurred while deleting a category from the user"
        });
    })
};

module.exports = { listController, createController , searchByIdController, updateController, deleteController}