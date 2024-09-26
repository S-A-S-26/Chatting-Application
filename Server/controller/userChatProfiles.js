const User = require('../model/user')

async function userChatProfiles(req, res) {
    try {
        const data = await User.find().select({ password: 0 })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error:${error}` })
    }
}

module.exports = userChatProfiles;
