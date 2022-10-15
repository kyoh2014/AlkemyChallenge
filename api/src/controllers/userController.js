const { User, Operation, Category }= require('../models/index');
const { AUTH_ROUNDS,
    AUTH_SECRET,
    AUTH_EXPIRES } = require('../configs/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User listing controller
const listController = async(req, res) => {

    // Get all users with their respective operations
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
    // Return of the list of users 
    .then(users => {
        res.json({ data: users });
    })
    .catch(err => {
        res.status(400).json({
            msg: "A user error occurred"
        });
    })
};

// User creation controller
const createController = async(req, res) => {
    
    // Regular expression implementation
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/)

    // Verification that the password respects regular expressions
    if (!regex.test(req.body.password)){
        return res.status(400).json({
            msg: 'The password must be between 8 and 15 characters long, with a combination of uppercase and lowercase letters and numbers.'    
            })
    }

    // Password encryption
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));
    
    // User account creation
    User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        password: password,
        username: req.body.username,
        email: req.body.email
    })
    // Added registered user token
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
        res.status(500).json({
        msg: 'An error occurred when creating an user'    
        })
    });
};

// User finder handler by id
const searchByIdController = async(req, res) => {

    // Obtaining the user through the id
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
    // Return of the obtained user
    .then(user => {
        res.json({ data: user });
    })
    .catch(err => {
        res.status(500).json({
        msg: 'An error occurred while searching for a user'    
        })
    });
};

// User update controller
const updateController = async(req, res) => {
    
    // Regular expression implementation
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/)
    
    // Verification that the password respects regular expressions
    if (!regex.test(req.body.password)){
        return res.status(400).json({
            msg: 'The password must use at least eight characters with a combination of uppercase letters, lowercase letters, and numbers.'    
            })
    }

    // Password encryption
    let password =  bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));
    
    // Obtaining the user to update
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
    // Return of updated user
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

// User delete controller
const deleteController = async(req, res) => {

    // Obtaining the user to update
    User.update({
        // The "null" is changed by the date on which the deletion was carried out
        deletedAt: new Date()
    }, {
        where: {
            id: req.params.id
        }
    })
    // Return the modified user, marked as deleted
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