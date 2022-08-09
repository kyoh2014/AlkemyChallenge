const { User, Operation, Category }= require('../models/index');
const { AUTH_ROUNDS,
    AUTH_SECRET,
    AUTH_EXPIRES } = require('../configs/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const listController = async(req, res) => {

    User.findAll({
        where: {
            deletedAt: null
        },
        include: {
            model: Operation,
            attributes: ['concept', 'amount', 'date', 'type'],
            include: {
                model: Category,
                attributes: ['name']
            }
        },
        attributes: ['username']
    })
    .then(users => {
        res.json({ data: users });
    })

};

const createController = async(req, res) => {
    
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/)

    if (!regex.test(req.body.password)){
        console.log(regex.test(req.body.password))
        return res.status(400).json({
            msg: 'The password must use at least eight characters with a combination of uppercase letters, lowercase letters, and numbers.'    
            })
    }
    
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));

    User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        password: password,
        username: req.body.username,
        email: req.body.email
        })
    .then(user => {
        let token = jwt.sign({ 
            id: user.id,
            email: user.email,
            username: user.username
         }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES
        });
            res.status(201).json({
                user: user,
                token: token
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            msg: 'An error occurred when creating an user'    
            })
        });
    
};

const searchByIdController = async(req, res) => {
    User.findByPk(req.params.id, {
        where: {
           deletedAt: null
        },
        include: {
            model: Operation,
            attributes: ['concept', 'amount', 'date', 'type'],
            include: {
                model: Category,
                attributes: ['name']
            }
        },
        attributes: ['name', 'lastname', 'username', 'email']
      })
    .then(user => {
        res.json({ data: user });
    })
};

const updateController = async(req, res) => {

    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/)

    if (!regex.test(req.body.password)){
        return res.status(400).json({
            msg: 'The password must use at least eight characters with a combination of uppercase letters, lowercase letters, and numbers.'    
            })
    }


    let password =  bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));

    User.update({
        name: req.body.name,
        lastname: req.body.lastname,
        password: password,
        username: req.body.username,
        email: req.body.email
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(user => {
        let token = jwt.sign({ 
            id: user.id,
            email: user.email,
            username: user.username
         }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES
        });
            res.status(201).json({
                user: user,
                token: token
            });
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        msg: 'an error occurred while updating the user'    
        })
    });

};

const deleteController = async(req, res) => {

    User.update({
        deletedAt: new Date()
}, {
        where: {
            id: req.params.id
        }
    })
    .then((result) => {
        res.status(201).send(result);
    })
    .catch(err => {
        res.status(400).send({
            msg: 'An error occurred while trying to delete the user'
        });
    })
};

module.exports = { listController, createController, searchByIdController, updateController, deleteController };