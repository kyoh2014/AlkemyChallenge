const { User } = require('../models/index')
const { AUTH_ROUNDS,
    AUTH_SECRET,
    AUTH_EXPIRES } = require('../configs/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signInController = async(req, res) => {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if(!user) {
            return res.status(400).json({
                msg: 'This user does not exist'
            })
        } 
        
        
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

const signUpController = async(req, res) => {

    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/)

    if (!regex.test(req.body.password)){
        return res.status(400).json({
            msg: 'The password must use at least eight characters with a combination of uppercase letters, lowercase letters, and numbers.'    
            })
    }


    let password =  bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS));

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
        res.status(500).json({
        msg: 'An error occurred while registering the user'    
        })
    });

};

const authController = async(req, res)=> {
    res.json(req.user);
}

module.exports = {signInController, signUpController, authController};