const { Operation, Category }= require('../models/index');

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
};

const createController = async(req, res) => {
    
    if (!(req.body.type.toLowerCase() === 'income' || req.body.type.toLowerCase() === 'egress')) {
        return res.status(400).json({msg: 'The type entered is wrong'})
    } 
    if(Number.parseInt(req.body.amount) > 0 && req.body.type.toLowerCase() === 'egress') {

        req.body.amount = Number.parseInt(req.body.amount) * (-1)
    }
    if(Number.parseInt(req.body.amount) > 0 && req.body.type.toLowerCase() === 'income') {

        req.body.amount = Number.parseInt(req.body.amount)
    }


    let dateString = req.body.date.slice(0, -1) + '+00:00'

    Operation.create({
        concept: req.body.concept,
        amount: req.body.amount,
        date: Date.parse(dateString),
        type: req.body.type,
        idUser: req.body.idUser,
        idCategory: req.body.idCategory
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
};

const updateController = async(req, res) => {

    Operation.update({
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.json({ data: result });
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
        res.status(201).send({ data: result });
    })
    .catch(err => {
        res.status(400).send({
            error:err
        });
    })
};



module.exports = { listController, createController , searchByIdController, updateController, deleteController}
