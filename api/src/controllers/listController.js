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
        
        let reversed = operations.reverse() 

        res.json(reversed.slice(0, 10))

    })
};

module.exports = { listController };