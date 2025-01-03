const Chat = require('../model/chat')
const { io } = require('../app')
const { getInstanceIo, online } = require('../socket/socket')


async function createChat(req, res) {
    console.log("create Chat req body", req.body)
    try {
        if (req.body) {
            let chat = await Chat.findOne({ participants: { $all: req.body.participants }, isGroup: false })
            let newMessageId
            // console.log("existing chat", chat)
            if (chat) {
                // console.log("req.body.messages", req.body.message)
                chat.messages.push(req.body.message)
                newMessageId = chat.messages[chat.messages.length - 1]._id;
            } else {
                chat = new Chat({
                    "participants": req.body.participants,
                    "messages": [req.body.message]
                })
                newMessageId = chat.messages[0]._id;
            }
            // console.log('chat', chat)
            await chat.save()
            sendDataToReceipient(req.body.sentBy, req.body.receiver, req.body.message, newMessageId)
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

async function sendDataToReceipient(sender, receiver, message, mid) {
    console.log("paritcipants", receiver, message)
    const socketio = getInstanceIo()
    const sid = online[receiver]
    message.timestamp = new Date()
    message._id = mid
    // console.log("sendDataToReceipient", socketio)
    // socketio.emit("welcome", "Socket from chat responding")
    socketio.to(sid).emit('incomingMsg', { message, sender })
}
module.exports = createChat
