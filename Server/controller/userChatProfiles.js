const User = require('../model/user')
const Chat = require('../model/chat')

async function userChatProfiles(req, res) {
    try {
        const data = await User.find().select({ password: 0 })
        console.log("data", data.length)
        user_id = req.query.user
        console.log("user id", user_id)
        for (let user of data) {
            console.log("user b4", user_id.toString())
            let unseenCount = 0;
            const chat = await Chat.findOne({
                participants: {
                    $all: [user._id, user_id],
                },
                isGroup: false
            })
                .select({ messages: 1 })
            // console.log("message in user chat profile", chat)

            if (chat) {
                console.log("user.name", user.username)
                // Traverse the messages array in reverse
                for (let i = chat.messages.length - 1; i >= 0; i--) {
                    if (!chat.messages[i].seen && chat.messages[i].sender != user_id) {
                        console.log("inside unseen count", chat.messages[i])
                        unseenCount++;  // Increment unseen count if message is not seen
                    } else {
                        break;  // Stop once we hit a seen message
                    }
                }
                user.unseenCount = unseenCount
                console.log("chat", chat)
                if (chat.messages.length > 0) {
                    user.lastMsgTimestamp = chat.messages[chat.messages.length - 1].timestamp
                }
            } else {

                user.unseenCount = 0
            }
            console.log("unseenCount", unseenCount)
        }
        // console.log("data contact list", data)
        return res.status(200).json(data)
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ msg: `Internal Server Error:${error}` })
    }
}

module.exports = userChatProfiles;
