const { Op } = require("sequelize");
const { Operation, Category } = require('../models/index');


const listController = async(req, res) => {

    
    
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
    .then(operations => {
        res.json({ data: operations });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred in user operations"  
        })
    });
};

const createController = async(req, res) => {
console.log(req.body)
    
    if (!(req.body.type.toLowerCase() === 'income' || req.body.type.toLowerCase() === 'egress')) {
        return res.status(400).json({msg: 'The type entered is wrong'})
    } 
    if(Number.parseInt(req.body.amount) > 0 && req.body.type.toLowerCase() === 'egress') {

        req.body.amount = Number.parseInt(req.body.amount) * (-1)
    }
    if(Number.parseInt(req.body.amount) > 0 && req.body.type.toLowerCase() === 'income') {

        req.body.amount = Number.parseInt(req.body.amount)
    }


    let dateString = req.body.date + ':00.000+00:00'
    let idCategoryNumber = Number.parseInt(req.body.idCategory)



    Operation.create({
        concept: req.body.concept,
        amount: req.body.amount,
        date: Date.parse(dateString),
        type: req.body.type,
        idUser: req.user.id,
        idCategory: idCategoryNumber
        })
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

const searchByIdController = async(req, res) => {
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
    .then(operation => {
        res.json({ data: operation });
    })
    .catch(err => {
        res.status(500).json({
        msg: "An error occurred while searching for a user operation"  
        })
    });
};

const updateController = async(req, res) => {

    if (!(req.body.type.toLowerCase() === 'income' || req.body.type.toLowerCase() === 'egress')) {
        return res.status(400).json({msg: 'The type entered is wrong'})
    } 
    if(Number.parseInt(req.body.amount) > 0 && req.body.type.toLowerCase() === 'egress') {

        req.body.amount = Number.parseInt(req.body.amount) * (-1)
    }
    if(Number.parseInt(req.body.amount) > 0 && req.body.type.toLowerCase() === 'income') {

        req.body.amount = Number.parseInt(req.body.amount)
    }


    let dateString = req.body.date + ':00.000+00:00'
    let idCategoryNumber = Number.parseInt(req.body.idCategory)

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
    .then(result => {
        res.json({ data: result });
    })
    .catch(err => {
        res.status(500).json({
            msg: "An error occurred while updating a user operation"
        });
    })

};

const deleteController = async(req, res) => {
    Operation.update({
        deletedAt: new Date()
}, {
        where: {
            id: req.params.id
        }
    })
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
