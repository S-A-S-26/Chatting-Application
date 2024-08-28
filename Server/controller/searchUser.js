const User = require('../model/user')

function searchUser(req,res){
    console.log("Searching user",req.query)
    const {name,phone}= req.query
    let query = {}
    if (name){
        query.username = new RegExp(name, 'i')
    }
    if (phone){
        query.phone = new RegExp(phone, 'i')
    }
    console.log("search query",query)
    User.find(query)
   .then(users=>res.status(200).json(users))
}

module.exports = searchUser;