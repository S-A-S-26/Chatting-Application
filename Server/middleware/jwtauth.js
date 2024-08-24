const jwt = require('jsonwebtoken')

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
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: `Invalid token: ${error}` });
    }
}

module.exports = jwtAuth;