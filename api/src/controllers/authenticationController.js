const { User } = require('../models/index')
const { AUTH_ROUNDS,
    AUTH_SECRET,
    AUTH_EXPIRES } = require('../configs/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// User login controller
const signInController = async(req, res) => {
    // Obtaining data from the body
    const { email, password } = req.body; 
    // Obtaining the user through email
    User.findOne({ 
        where: {
            email: email
        }
    })
    .then(user => {
        // Verification of the existence of the user
        if(!user) {
            return res.status(400).json({
                msg: 'This user does not exist'
            })
        }  
        // Verification of user data validation  
        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({ 
                id: user.id,
                email: user.email,
                username: user.username
             }, AUTH_SECRET, {
                expiresIn: AUTH_EXPIRES
            });
            res.status(200).json({
                token: token
            });
        } else {
            res.status(400).json({
                msg: 'Incorrect password'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
        msg: 'An error occurred when login as user'    
        })
    })
};

// User register controller.
const signUpController = async(req, res) => {

    // Regular expression implementation
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)[A-Za-z0-9\d$@$!%*?&]{8,15}$/)

    // Verification that the password respects regular expressions
    if (!regex.test(req.body.password)){
        return res.status(400).json({
            msg: 'The password must be between 8 and 15 characters long, with a combination of uppercase and lowercase letters and numbers.'    
            })
    }

    // Password encryption
    let password =  bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));

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
        msg: 'An error occurred while registering the user'    
        })
    });
};

// User auth controller.
const authController = async(req, res)=> {
    res.json(req.user);
}

module.exports = {signInController, signUpController, authController};