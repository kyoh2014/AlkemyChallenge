const { AUTH_SECRET } = require('../configs/index');
const jwt = require('jsonwebtoken');


const validateToken = async(req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).json({ msg: 'Unauthorized access' });
    }

  const token = req.headers.authorization.split(" ")[1]

  if (!token){
    return res.status(400).json({ 
        msg: 'user not logged in'
    })
  }

    jwt.verify(token, AUTH_SECRET, (err, decoded) =>{

        if(err){
            return res.status(500).json({
        msg: 'An error occurred while validating the token'
        });
        } else {
            req.user = decoded
            return next()
        }

    })
};


module.exports = { validateToken }