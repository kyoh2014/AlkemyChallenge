const { Op } = require("sequelize");
const { Operation, Category } = require('../models/index');

// Operation listing controller for the user
const listController = async(req, res) => {
    
    // Get all operations
    Operation.findAll({
        where: {
            deletedAt:null,
        },
        include: {
            model: Category,
            attributes: ['name']
        },
        attributes: ['id', 'concept', 'amount', 'date', 'type'] 
    })
    // Return of the list of operations obtained
    .then(operations => {
        res.json({ data: operations });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred in user operations"  
        })
    });
};

// Operation creation controller for the user
const createController = async(req, res) => {
    
    // Check the case of the type
    if (!(req.body.type.toLowerCase() === 'income' || req.body.type.toLowerCase() === 'egress')) {
        return res.status(400).json({msg: 'The type entered is wrong'})
    } 
    // Management of the amount withdrawn (negative)
    if (req.body.type.toLowerCase() === 'egress'){
        if(Number.parseInt(req.body.amount) > 0) {
            req.body.amount = Number.parseInt(req.body.amount) * (-1)
        } else {
            req.body.amount = Number.parseInt(req.body.amount)
        }
    } else {
        // Management of the entered amount (positive)
        req.body.amount = Math.abs(req.body.amount)
    }
    
    // Keeping the necessary date format
    let dateString = req.body.date + ':00.000+00:00'
    // Keeping the idcategory an integer
    let idCategoryNumber = Number.parseInt(req.body.idCategory)

    // Creation of the operation
    Operation.create({
        concept: req.body.concept,
        amount: req.body.amount,
        date: Date.parse(dateString),
        type: req.body.type,
        idUser: req.user.id,
        idCategory: idCategoryNumber
    })
    // Return of the created operation
    .then(Operation => {
        res.json({ data: Operation }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        msg: 'An error occurred when creating an operation'    
        })
    })
};

// Operation finder handler by id
const searchByIdController = async(req, res) => {

    // Obtaining the operation through the id
    Operation.findByPk(req.params.id, {
        where: {
           deletedAt: null
        },
        include: {
        model: Category,
        attributes: ['name']
        },
        attributes: ['concept', 'amount', 'date', 'type']
      })
    // Return of the obtained operation
    .then(operation => {
        res.json({ data: operation });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred while searching for a user operation"  
        })
    });
};

// Operation update  controller
const updateController = async(req, res) => {

    // Check the case of the type
    if (!(req.body.type.toLowerCase() === 'income' || req.body.type.toLowerCase() === 'egress')) {
        return res.status(400).json({msg: 'The type entered is wrong'})
    } 
    // Management of the amount withdrawn (negative)
    if (req.body.type.toLowerCase() === 'egress'){
        if(Number.parseInt(req.body.amount) > 0) {
            req.body.amount = Number.parseInt(req.body.amount) * (-1)
        } else {
            req.body.amount = Number.parseInt(req.body.amount)
        }
    } else {
        // Management of the entered amount (positive)
        req.body.amount = Math.abs(req.body.amount)
    }

    // Keeping the necessary date format
    let dateString = req.body.date + ':00.000+00:00'
    // Keeping the idcategory an integer
    let idCategoryNumber = Number.parseInt(req.body.idCategory)

    // Obtaining the operation to update
    Operation.update({
        concept: req.body.concept,
        amount: req.body.amount,
        date: Date.parse(dateString),
        idCategory: idCategoryNumber
    }, {
        where: {
            id: req.params.id
        }
    })
    // Return of updated operation
    .then(result => {
        res.json({ data: result });
    })
    .catch(err => {
        res.status(500).json({
            msg: "An error occurred while updating a user operation"
        });
    })
};

// Operation delete controller
const deleteController = async(req, res) => {

    // Obtaining the operation to update
    Operation.update({
        // The "null" is changed by the date on which the deletion was carried out
        deletedAt: new Date()
    }, {
        where: {
            id: req.params.id
        }
    })
    // Return the modified operation, marked as deleted
    .then((result) => {
        res.status(200).send({ data: result });
    })
    .catch(err => {
        res.status(400).json({
            msg: "An error occurred while deleting a user operation"
        });
    })
};

module.exports = { listController, createController , searchByIdController, updateController, deleteController}
