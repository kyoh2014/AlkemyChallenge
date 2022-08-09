const { Operation, Category, sequelize }= require('../models/index');
const { OPERATIONS_IN_RESUME } = require('../configs/index')

const balanceController = async(req, res) => {

    Operation.findAll({
        where: {
            deletedAt: null,
            idUser: req.user.id
        },
        attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']]
        
    })
    .then(totalAmount => {

        res.json({ data: totalAmount })

    })

};

const resumeController = async(req, res) => {

    Operation.findAll({
        where: {
            deletedAt:null,
        },
        include: {
            model: Category,
            attributes: ['name']
        },
        attributes: ['id', 'concept', 'amount', 'date', 'type'],

        order: [
            ['id', 'DESC']
        ],
        limit: OPERATIONS_IN_RESUME
        
    })
    .then(amount => {

        res.json({ data: amount })

    })

}


module.exports = { balanceController, resumeController };