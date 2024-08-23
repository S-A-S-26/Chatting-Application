const User = require('../model/user')
const bcrypt = require('bcrypt')

async function register(req,res){
    const data= req.body
    if (!data){
        return res.status(400).json({msg:'No data provided'})
    }
    const preExisting=await User.findOne({phone:data.phone})
    console.log("pre existing user",preExisting)
    if (data && !preExisting){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const user =await new User({...data,password:hashedPassword})
        await user.save()
        const token =await user.jwtSign()
        console.log("registeration done")
        return res.status(200).json({msg:"User created successfully",token:token})
    }else{
        return res.status(400).json({msg:'User already exists'})
    }
}

module.exports = register;