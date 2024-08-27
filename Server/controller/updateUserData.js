const User = require('../model/user')

async function userNameUpdate(req,res){
    console.log("Updating username",req.body)
    if (!req.body){
        return res.status(400).json({msg:'No data provided'})
    }
    try {
        const user =await User.findByIdAndUpdate(req.body._id,{username:req.body.username},{new:true})
        return res.status(200).json({msg:'User updated successfully',user:user})
    } catch (error) {
        return res.status(400).json({msg:`Something went wrong ${error}`})
    }
}

async function statusUpdate(req,res){
    if (!req.body){
        return res.status(400).json({msg:'No data provided'})
    }
    try {
        const user =await User.findByIdAndUpdate(req.body._id,{status:req.body.status},{new:true})
        return res.status(200).json({msg:'Status updated successfully',user:user})
    } catch (error) {
        return res.status(400).json({msg:"Something went wrong"})
    }
}

module.exports = {userNameUpdate, statusUpdate}