const jwt = require('jsonwebtoken')
const User = require('../model/user')

async function jwtAuth(req,res,next){
    try {
        let token = req.header('Authorization');
        console.log("token",token);
        if (!token) {
            console.log("inside if")
            return res.status(401).json({ msg: 'Token not provided' });
        }
        token = token.replace("Bearer",'').trim();
        console.log("token after",token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded._doc);
        if (!decoded) {
            console.log("inside catch")
            return res.status(401).json({ msg: 'Token is invalid' });  // token is not valid
        }
        const user = await User.findOne({_id:decoded._id})
        req.user = user;
        delete req.user.password
        next();
    } catch (error) {
        res.status(401).json({ msg: `Invalid token: ${error}` });
    }
}

module.exports = jwtAuth;