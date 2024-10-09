const User = require('../model/user')


async function markLastOnline(id) {
    try {
        console.log("markLastOnlineFunctionExec", id)
        const user = await User.findById(id)
        user.lastSeen = new Date()
        await user.save()
    } catch (error) {
        console.log("Internal Server Error(markLastOnline):", error)
    }
}

module.exports = markLastOnline
