
function checkAuth(req, res){
    return res.status(200).json({msg:true,user:req.user});
}

module.exports = checkAuth;