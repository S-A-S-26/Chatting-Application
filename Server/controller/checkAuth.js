
function checkAuth(req, res){
    return res.status(200).json({msg:true})
}

module.exports = checkAuth;