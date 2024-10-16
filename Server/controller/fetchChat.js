const Chat = require('../model/chat')

async function fetchChat(req, res) {
    console.log("fetchchat body", req.body)
    try {
        let participants = req.body.participants
        const chats = await Chat.findOne({
            participants: { $all: participants }

        });
        console.log("paricipants params", participants)
        console.log("chats", chats)
        res.status(200).json(chats)
    } catch (error) {
        console.log("error fetchChat", error)
        res.status(500).json({ msg: `Internal Server Error: ${error}` })
    }
}

module.exports = fetchChat
