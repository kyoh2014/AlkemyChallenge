const { AUTH_SECRET } = require('../configs/index');
const jwt = require('jsonwebtoken');


const validateToken = async(req, res, next) => {
    if(!req.header("authorization")){
        return res.status(403).json({ msg: 'Unauthorized access' });
    }

  const token = req.header("authorization").split(" ")[1]

  if (!token){
    return res.status(403).json({ 
        msg: 'user not logged in'
    })
  }

    jwt.verify(token, AUTH_SECRET, (err, decoded) =>{

        if(err){
            return res.status(401).json({
        msg: 'Invalid token'
        });
        } else {
            req.user = decoded
            return next()
        }

    })
};


module.exports = { validateToken }