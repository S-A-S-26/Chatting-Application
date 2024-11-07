const User = require('../model/user')
const bcrypt = require('bcrypt')

async function loginUser(req, res) {
    const data = req.body
    if (!data) {
        return res.status(400).json({ msg: 'No data provided' })
    }
    const user = await User.findOne({ phone: data.phone })
    console.log("loginuser", user, data.password, user.password)
    if (user && await bcrypt.compare(data.password, user.password)) {
        const token = await user.jwtSign()
        console.log("login done")
        return res.status(200).json({ msg: "Logged in successfully", token: token })
    } else {
        return res.status(400).json({ msg: 'Invalid credentials' })
    }
}

module.exports = loginUser;
