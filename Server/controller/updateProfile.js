const User =require("../model/user");

async function updateProfile(req,res){
    console.log("Updating profile",req.body);
    try {
        if(!req.body){
            return res.status(400).json({msg: 'No data provided'})
        }
        const user = await User.findByIdAndUpdate(req.body._id, {profile:req.body._id}, { new: true }).select({password:0})
        console.log("Updated profile",user)
        res.status(200).json(user)
    } catch (error) {
        console.log("error",error)
        res.status(500).json({msg: error.message})
    }
}

module.exports = updateProfile;