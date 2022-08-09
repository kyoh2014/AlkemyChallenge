const { Category }= require("../models/index")

const listController =  async(req, res) => {
    
    Category.findAll({
        where: {
            deletedAt:null
        },
        attributes: ['id', 'name']
      }
    )
    .then(categories => {
        res.json({ data: categories });
    })
};

const createController = async(req, res) => {

    Category.create({

        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        miniature: req.body.miniature

        })
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

const searchByIdController = async(req, res) => {
    Category.findByPk(req.params.id, {
        where: {
           deletedAt: null
        },
        attributes: ['deletedAt', 'name']
      })
    .then(category => {
        res.json({ data: category });
    })
};

const updateController = async(req, res) => {

    // if (Category.deletedAt) {
    //     Category.update({
    //         deletedAt: null
    // }, {
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     .then((result) => {
    //         res.status(201).send(result);
    //     })
    //     .catch(err => {
    //         res.status(400).send({
    //             error:err
    //         });
    //     })
    // }

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
    .then(result => {
        res.json({ data: result });
    })

};

const deleteController = async(req, res) => {

    Category.update({
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