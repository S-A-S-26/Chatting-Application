const User = require('../model/user')
const Chat = require('../model/chat')

async function fetchGroupChat(req, res) {
    console.log("fetchchat body", req.body)
    try {
        let groupName = req.body.groupName
        console.log("groupName", groupName)
        const chats = await Chat.findOne({
            groupName: groupName

        });
        const chats_obj = JSON.parse(JSON.stringify(chats));
        console.log("chats_obj", chats_obj.messages)
        for (let i in chats_obj.messages) {
            console.log("i", chats_obj.messages[i])
            let user_data = await User.findOne({
                "_id": chats_obj.messages[i].sender
            })
            console.log("user data", user_data)
            chats_obj.messages[i].username = user_data.username
            chats_obj.messages[i].profile = user_data.profile

            console.log("i after", chats_obj.messages[i])
        }
        console.log("chats group chat", chats_obj)
        res.status(200).json(chats_obj)
    } catch (error) {
        console.log("error fetchChat", error)
        res.status(500).json({ msg: `Internal Server Error: ${error}` })
    }
}

module.exports = fetchGroupChat
