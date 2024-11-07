
const Chat = require('../model/chat')

async function fetchGroupChat(req, res) {
    console.log("fetchchat body", req.body)
    try {
        let groupName = req.body.groupName
        console.log("groupName", groupName)
        const chats = await Chat.findOne({
            groupName: groupName

        });
        console.log("paricipants params", participants)
        console.log("chats group chat", chats)
        res.status(200).json(chats)
    } catch (error) {
        console.log("error fetchChat", error)
        res.status(500).json({ msg: `Internal Server Error: ${error}` })
    }
}

module.exports = fetchGroupChat
