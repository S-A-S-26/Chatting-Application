const jwt = require('jsonwebtoken')
const User = require('../model/user')

async function jwtAuth(req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ msg: 'Token not provided' });
        }
        token = token.replace("Bearer", '').trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ msg: 'Token is invalid' });  // token is not valid
        }
        const user = await User.findOne({ _id: decoded._id }).select({ password: 0 })
        req.user = user;
        delete req.user.password
        next();
    } catch (error) {
        res.status(401).json({ msg: `Invalid token: ${error}` });
    }
}

module.exports = jwtAuth;
