const Chat = require('../model/chat')

async function createChat(req, res) {
    console.log("create Chat", req.body)
    try {
        if (req.body) {
            let chat = await Chat.findOne({ participants: { $all: req.body.participants } })
            console.log("existing chat", chat)
            if (chat) {
                console.log("req.body.messages", req.body.message)
                chat.messages.push(req.body.message)
            } else {
                chat = new Chat({
                    "participants": req.body.participants,
                    "messages": [req.body.message]
                })
            }
            console.log('chat', chat)
            await chat.save()
            res.status(200).json({ msg: "message sent successfully" })
        } else {
            res.status(500).json({
                msg: `Server Error:${error}`
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: `Server Error:${error}`
        })
    }
}

module.exports = createChat
